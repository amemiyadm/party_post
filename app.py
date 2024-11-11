from flask import Flask, jsonify, render_template, request
import cv2
import numpy as np
import pytesseract
from PIL import Image
import Levenshtein
import base64
import os
import concurrent.futures
from constants import crop_areas, tera_percent, tera_images, poke_words, item_words, move_words
import requests
from bs4 import BeautifulSoup
from io import BytesIO
import json

app = Flask(__name__)


@app.route('/')
def index():
    rule = request.args.get('rule', '')
    season = request.args.get('season', '').replace('season', '')
    regulation = request.args.get('regulation', '')
    rank = request.args.get('rank', '')
    url = request.args.get('url', '')
    if any(keyword in url for keyword in ('hatenablog', 'hatenadiary', 'hateblo')):
        title = BeautifulSoup(requests.get(url).content, 'html.parser').find('a', class_='entry-title-link').get_text()
    elif 'note.com' in url:
        title = BeautifulSoup(requests.get(url).content, 'html.parser').find('h1', class_='o-noteContentHeader__title').get_text().lstrip().rstrip()
    elif 'livedoor' in url:
        title = BeautifulSoup(requests.get(url).content, 'html.parser').find('h1', class_='article-title').a.string
    else:
        title = BeautifulSoup(requests.get(url).content, 'html.parser').title.string
    name = request.args.get('name', '')
    pokemon = [request.args.get('pokemon' + str(i), '') for i in range(1, 7)]
    tera = [request.args.get('tera' + str(i), '') for i in range(1, 7)]
    return render_template('index.html', rule=rule, season=season, regulation=regulation, rank=rank, url=url, title=title, name=name, pokemon=pokemon, tera=tera)


# 画像がアップロードされた時の処理
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    with Image.open(file) as img:
        # base64形式のテキストに変換
        with BytesIO() as buffered:
            img.save(buffered, format="PNG")
            base64_text = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # 大きさを固定するためにリサイズ
        width = 2560
        height = 1440
        img = img.resize((width, height), Image.BICUBIC)

        processed_images = []
        cropped_image_base64 = []
        for percent_box in crop_areas:
            # 読み取り位置に合わせて画像をクロップ
            left = int(width * percent_box[0] / 100)
            top = int(height * percent_box[1] / 100)
            right = int(width * percent_box[2] / 100)
            bottom = int(height * percent_box[3] / 100)
            cropped_img = img.crop((left, top, right, bottom))

            # base64形式のテキストに変換
            with BytesIO() as buffered:
                cropped_img.save(buffered, format="PNG")
                cropped_image_base64.append(base64.b64encode(buffered.getvalue()).decode("utf-8"))

            # 読み取りやすいように白黒に変換
            cropped_img = cropped_img.convert("L")
            cropped_img = cropped_img.point(lambda p: p < 120 and 255)
            processed_images.append(cropped_img)

        tera_image_base64 = []
        for percent_box in tera_percent:
            left = int(width * percent_box[0] / 100)
            top = int(height * percent_box[1] / 100)
            right = int(width * percent_box[2] / 100)
            bottom = int(height * percent_box[3] / 100)
            cropped_img = img.crop((left, top, right, bottom))
            with BytesIO() as buffered:
                cropped_img.save(buffered, format="PNG")
                tera_image_base64.append(base64.b64encode(buffered.getvalue()).decode("utf-8"))

    # OCRを実行する関数
    def perform_ocr(img):
        custom_config = '--psm 7 -l jpn'
        text = pytesseract.image_to_string(img, config=custom_config)
        return text

    # 処理された画像を非同期処理で同時にOCRを実行
    with concurrent.futures.ThreadPoolExecutor() as executor:
        texts = list(executor.map(perform_ocr, processed_images))

    closest_words = []
    for i, text in enumerate(texts):
        max_similarity = 0
        closest_word = ""
        if i < 6:
            target_words = poke_words
        elif i < 12:
            target_words = item_words
        else:
            target_words = move_words
        for target_word in target_words:
            # OCRで読み取られた文字とポケモン名がどれだけ近いか
            levenshtein_distance = Levenshtein.distance(text, target_word)
            # 共通部分を前方から探す
            common_prefix = os.path.commonprefix([text, target_word])
            # 共通部分を後方から探す
            common_suffix = os.path.commonprefix([text[::-1], target_word[::-1]])[::-1]
            # 一致する文字数
            partial_match_length = len(common_prefix) + len(common_suffix)
            # 一致する文字数を長い方の文字列で割って一致率を計算
            partial_match_score = partial_match_length / max(len(text), len(target_word))
            # レーベシュタイン距離に0.7、文字の一致率に0.3の重みをかけて計算
            similarity = 0.7 * (1 - levenshtein_distance / max(len(text), len(target_word))) + 0.3 * partial_match_score
            # 最も一致率が高い文字列を返すようにする
            if similarity > max_similarity:
                max_similarity = similarity
                closest_word = target_word
        closest_words.append(closest_word)

    # カーソルを先頭に戻す
    file.seek(0)

    # 画像ファイルをバイトデータとして読み込む
    file_data = file.read()

    # バイトデータをNumPy配列(数値計算ライブラリで使うデータ構造)に変換する
    np_array = np.frombuffer(file_data, np.uint8)

    # NumPy配列をOpenCVで画像にデコードする（カラー画像として読み込む）
    img_cv2 = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    teras = []
    for i, percent_box in enumerate(tera_percent):
        best_similarity = 0
        for teras_name, reference_image in tera_images.items():
            # OpenCVで読み込んだ画像から、heightとwidthを取得する(高さ、幅、色相数)
            height, width, _ = img_cv2.shape
            left = int(width * percent_box[0] / 100)
            top = int(height * percent_box[1] / 100)
            right = int(width * percent_box[2] / 100)
            bottom = int(height * percent_box[3] / 100)

            # アップロードされた画像をクロップする
            uploaded_roi = img_cv2[top:bottom, left:right]
            # テラスタルの画像をクロップした画像のサイズに合わせる
            img1_resized = cv2.resize(reference_image, (uploaded_roi.shape[1], uploaded_roi.shape[0]))
            # 2つの画像の差異を求める
            difference = cv2.absdiff(img1_resized, uploaded_roi)
            # 画像を2値化して差異を強調する
            _, threshold_diff = cv2.threshold(difference, 30, 255, cv2.THRESH_BINARY)
            # どれだけ一致しているか = NumPy配列の0の数(黒いピクセル＝一致している部分) / 全てのピクセルの数
            similarity = np.sum(threshold_diff == 0) / np.prod(threshold_diff.shape)

            # 現在最も一致している画像よりも一致していた場合、そのテラスタル名を格納
            if similarity > best_similarity:
                best_similarity = similarity
                best_teras_name = teras_name
        teras.append(best_teras_name)

    return jsonify({'base64_text': base64_text, 'closest_words': closest_words, 'teras': teras, 'cropped_image_base64': cropped_image_base64, 'tera_image_base64': tera_image_base64})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

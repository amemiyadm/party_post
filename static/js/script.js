/* ドロップエリアの処理 */ {
    const dropArea = document.getElementById('image-drop-area');
    const imageInput = document.getElementById('image-upload');

    //クリックでファイルを選択させる
    dropArea.addEventListener('click', () => {
        imageInput.click();
    })

    //ドラッグした時に背景色を変える
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#eee';
    })

    //ドラッグが離れた時に背景色を消す
    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = '';
    })

    //ファイルをドロップした時の処理
    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '';

        //ファイルが一つだけだったらポストする
        const files = event.dataTransfer.files;
        if (files.length == 1) {
            imageInput.files = files;
            imagePost();
        } else {
            alert('ドロップするファイルは1つだけにしてください。');
        }
    })

    //ファイルが変更されたらポストする
    document.getElementById('image-upload').addEventListener('change', function (event) {
        event.preventDefault();
        imagePost();
    })

    function imagePost() {
        const formData = new FormData();
        formData.append('image', document.getElementById('image-upload').files[0]);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('uploaded-image').setAttribute('src', 'data:image/jpeg;base64,' + data.base64_text);
                document.getElementById('rental-image').style.display = 'block';

                for (let i = 1; i <= 6; i++) {
                    document.getElementById('pokemon' + i).value = data.closest_words[i - 1];
                    document.getElementById('item' + i).value = data.closest_words[i - 1 + 6];
                    for (let j = 1; j <= 4; j++) {
                        document.getElementById('move' + i + j).value = data.closest_words[12 + ((i - 1) * 4) + (j - 1)];
                        document.getElementById('move-image' + i + j).setAttribute('src', 'data:image/jpeg;base64,' + data.cropped_image_base64[12 + ((i - 1) * 4) + (j - 1)]);
                    }
                    document.getElementById('tera' + i).value = data.teras[i - 1];

                    document.getElementById('poke-image' + i).setAttribute('src', 'data:image/jpeg;base64,' + data.cropped_image_base64[i - 1]);
                    document.getElementById('item-image' + i).setAttribute('src', 'data:image/jpeg;base64,' + data.cropped_image_base64[i - 1 + 6]);
                    document.getElementById('tera-image' + i).setAttribute('src', 'data:image/jpeg;base64,' + data.tera_image_base64[i - 1]);
                }
                checkSuggestionNeeded();
            })
    }
}

/* 順位に半角数字しか入力させない */ {
    const rankInput = document.getElementById('rank');
    rankInput.addEventListener('input', function (event) {
        const inputValue = event.target.value;
        const convertedValue = inputValue.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
        })
        rankInput.value = convertedValue;
    })
}

/* ポケモンのフォルムを選ばせる処理 */ {
    const formSuggestions = {
        'ライチュウ': ['ライチュウ', 'ライチュウ(アローラ)'],
        'サンド': ['サンド', 'サンド(アローラ)'],
        'サンドパン': ['サンドパン', 'サンドパン(アローラ)'],
        'ロコン': ['ロコン', 'ロコン(アローラ)'],
        'キュウコン': ['キュウコン', 'キュウコン(アローラ)'],
        'ディグダ': ['ディグダ', 'ディグダ(アローラ)'],
        'ダグトリオ': ['ダグトリオ', 'ダグトリオ(アローラ)'],
        'ニャース': ['ニャース', 'ニャース(アローラ)', 'ニャース(ガラル)'],
        'ペルシアン': ['ペルシアン', 'ペルシアン(アローラ)'],
        'ガーディ': ['ガーディ', 'ガーディ(ヒスイ)'],
        'ウインディ': ['ウインディ', 'ウインディ(ヒスイ)'],
        'イシツブテ': ['イシツブテ', 'イシツブテ(アローラ)'],
        'ゴローン': ['ゴローン', 'ゴローン(アローラ)'],
        'ゴローニャ': ['ゴローニャ', 'ゴローニャ(アローラ)'],
        'ヤドン': ['ヤドン', 'ヤドン(ガラル)'],
        'ヤドラン': ['ヤドラン', 'ヤドラン(ガラル)'],
        'ベトベター': ['ベトベター', 'ベトベター(アローラ)'],
        'ベトベトン': ['ベトベトン', 'ベトベトン(アローラ)'],
        'ビリリダマ': ['ビリリダマ', 'ビリリダマ(ヒスイ)'],
        'マルマイン': ['マルマイン', 'マルマイン(ヒスイ)'],
        'ナッシー': ['ナッシー', 'ナッシー(アローラ)'],
        'マタドガス': ['マタドガス', 'マタドガス(ガラル)'],
        'ケンタロス': ['ケンタロス', 'ケンタロス(パルデア単)', 'ケンタロス(パルデア炎)', 'ケンタロス(パルデア水)'],
        'フリーザー': ['フリーザー', 'フリーザー(ガラル)'],
        'サンダー': ['サンダー', 'サンダー(ガラル)'],
        'ファイヤー': ['ファイヤー', 'ファイヤー(ガラル)'],
        'バクフーン': ['バクフーン', 'バクフーン(ヒスイ)'],
        'ウパー': ['ウパー', 'ウパー(パルデア)'],
        'ヤドキング': ['ヤドキング', 'ヤドキング(ガラル)'],
        'ハリーセン': ['ハリーセン', 'ハリーセン(ヒスイ)'],
        'ニューラ': ['ニューラ', 'ニューラ(ヒスイ)'],
        'デオキシス': ['デオキシス(ノーマル)', 'デオキシス(アタック)', 'デオキシス(ディフェンス)', 'デオキシス(スピード)'],
        'カラナクシ': ['カラナクシ(ピンク)', 'カラナクシ(水色)'],
        'トリトドン': ['トリトドン(ピンク)', 'トリトドン(水色)'],
        'ロトム': ['ロトム', 'ヒートロトム', 'ウォッシュロトム', 'フロストロトム', 'スピンロトム', 'カットロトム'],
        'ディアルガ': ['ディアルガ', 'ディアルガ(オリジン)'],
        'パルキア': ['パルキア', 'パルキア(オリジン)'],
        'ギラティナ': ['ギラティナ(アナザー)', 'ギラティナ(オリジン)'],
        'シェイミ': ['シェイミ(ランド)', 'シェイミ(スカイ)'],
        'ダイケンキ': ['ダイケンキ', 'ダイケンキ(ヒスイ)'],
        'ドレディア': ['ドレディア', 'ドレディア(ヒスイ)'],
        'バスラオ': ['バスラオ(赤すじ)', 'バスラオ(青すじ)', 'バスラオ(白すじ)'],
        'ゾロア': ['ゾロア', 'ゾロア(ヒスイ)'],
        'ゾロアーク': ['ゾロアーク', 'ゾロアーク(ヒスイ)'],
        'シキジカ': ['シキジカ(春)', 'シキジカ(夏)', 'シキジカ(秋)', 'シキジカ(冬)'],
        'メブキジカ': ['メブキジカ(春)', 'メブキジカ(夏)', 'メブキジカ(秋)', 'メブキジカ(冬)'],
        'ウォーグル': ['ウォーグル', 'ウォーグル(ヒスイ)'],
        'トルネロス': ['トルネロス(化身)', 'トルネロス(霊獣)'],
        'ボルトロス': ['ボルトロス(化身)', 'ボルトロス(霊獣)'],
        'ランドロス': ['ランドロス(化身)', 'ランドロス(霊獣)'],
        'ニャオニクス': ['ニャオニクス♂', 'ニャオニクス♀'],
        'ヌメイル': ['ヌメイル', 'ヌメイル(ヒスイ)'],
        'ヌメルゴン': ['ヌメルゴン', 'ヌメルゴン(ヒスイ)'],
        'クレベース': ['クレベース', 'クレベース(ヒスイ)'],
        'ジュナイパー': ['ジュナイパー', 'ジュナイパー(ヒスイ)'],
        'オドリドリ': ['オドリドリ(めらめら)', 'オドリドリ(ふらふら)', 'オドリドリ(まいまい)', 'オドリドリ(ぱちぱち)'],
        'ルガルガン': ['ルガルガン(まひる)', 'ルガルガン(まよなか)', 'ルガルガン(たそがれ)'],
        'ネクロズマ': ['ネクロズマ', 'ネクロズマ(日食)', 'ネクロズマ(月食)'],
        'ストリンダー': ['ストリンダー(ハイ)', 'ストリンダー(ロー)'],
        'イエッサン': ['イエッサン♂', 'イエッサン♀'],
        'ウーラオス': ['ウーラオス(悪)', 'ウーラオス(水)'],
        'バドレックス': ['バドレックス', 'バドレックス(白)', 'バドレックス(黒)'],
        'ガチグマ': ['ガチグマ', 'ガチグマ(アカツキ)'],
        'イダイトウ': ['イダイトウ♂', 'イダイトウ♀'],
        'ラブトロス': ['ラブトロス(化身)', 'ラブトロス(霊獣)'],
        'パフュートン': ['パフュートン♂', 'パフュートン♀'],
        'イッカネズミ': ['イッカネズミ(3びき)', 'イッカネズミ(4ひき)'],
        'イキリンコ': ['イキリンコ(グリーン)', 'イキリンコ(ブルー)', 'イキリンコ(イエロー)', 'イキリンコ(ホワイト)'],
        'シャリタツ': ['シャリタツ(橙色)', 'シャリタツ(赤色)', 'シャリタツ(黄色)'],
        'コレクレー': ['コレクレー(はこ)', 'コレクレー(とほ)'],
        'オーガポン': ['オーガポン(みどり)', 'オーガポン(いど)', 'オーガポン(かまど)', 'オーガポン(いしずえ)']
    }

    function checkSuggestionNeeded() {
        for (let i = 1; i <= 6; i++) {
            const pokeInput = document.getElementById('pokemon' + i);

            //わざの間違いを修正する
            const learnedMoves = [];
            const correctionList = [
                { pokemon: 'ドヒドイデ', correctionMove: 'じごくづき', proper: 'どくづき' }
            ];

            for (let j = 1; j <= 4; j++) {
                const moveInput = document.getElementById('move' + i + j);
                for (let k = 0; k < correctionList.length; k++) {
                    if (pokeInput.value == correctionList[k].pokemon && moveInput.value == correctionList[k].correctionMove) {
                        moveInput.value = correctionList[k].proper;
                    }
                }
                learnedMoves.push(moveInput.value);
            }


            //わざでフォルムを確定させる
            const formList = [
                { poke: 'ウーラオス', move: 'すいりゅうれんだ', form: 'ウーラオス(水)' },
                { poke: 'ウーラオス', move: 'あんこくきょうだ', form: 'ウーラオス(悪)' },
                { poke: 'ガチグマ', move: 'ブラッドムーン', form: 'ガチグマ(アカツキ)' },
                { poke: 'バドレックス', move: 'ブリザードランス', form: 'バドレックス(白)' },
                { poke: 'バドレックス', move: 'アストラルビット', form: 'バドレックス(黒)' },
                { poke: 'キュウコン', move: 'オーロラベール', form: 'キュウコン(アローラ)' },
                { poke: 'ロトム', move: 'オーバーヒート', form: 'ヒートロトム' },
                { poke: 'ロトム', move: 'ハイドロポンプ', form: 'ウォッシュロトム' },
                { poke: 'ロトム', move: 'ふぶき', form: 'フロストロトム' },
                { poke: 'ロトム', move: 'エアスラッシュ', form: 'スピンロトム' },
                { poke: 'ロトム', move: 'リーフストーム', form: 'カットロトム' },
                { poke: 'ゾロアーク', move: 'うらみつらみ', form: 'ゾロアーク(ヒスイ)' }
            ];
            for (let k = 0; k < formList.length; k++) {
                if (pokeInput.value == formList[k].poke && learnedMoves.includes(formList[k].move)) {
                    pokeInput.value = formList[k].form;
                }
            }

            //オーガポンはテラスタイプでフォルムを確定
            if (pokeInput.value == 'オーガポン') {
                const teraInput = document.getElementById('tera' + i);
                const typeList = { 'くさ': 'オーガポン(みどり)', 'みず': 'オーガポン(いど)', 'ほのお': 'オーガポン(かまど)', 'いわ': 'オーガポン(いしずえ)' };
                for (let type in typeList) {
                    if (teraInput.value == type) {
                        pokeInput.value = typeList[type];
                    }
                }
            }
        }

        //フォルム候補があるポケモンなら背景を赤くする
        for (let i = 1; i <= 6; i++) {
            const pokeInput = document.getElementById('pokemon' + i);
            const suggestionsContainer = document.getElementById('pokemon' + i + 'suggestion');

            if (Object.keys(formSuggestions).includes(pokeInput.value)) {
                pokeInput.classList.add('red-background');
                suggestionsContainer.innerHTML = '';

                //フォルム候補と同時に出すと見た目が崩れるため、jQueryのautocomplateを無効にする
                if (typeof $ !== 'undefined' && $.ui && $.ui.autocomplete) {
                    $(pokeInput).autocomplete('disable');
                }
                suggestions = formSuggestions[pokeInput.value];
                //候補の数だけ繰り返し
                suggestions.forEach(suggestion => {
                    const suggestionElement = document.createElement('div');
                    suggestionElement.className = 'suggestion';
                    suggestionElement.textContent = suggestion;
                    suggestionsContainer.appendChild(suggestionElement);

                    //候補を選んだ時の処理
                    suggestionElement.addEventListener('click', function () {
                        pokeInput.classList.remove('red-background');
                        pokeInput.value = this.textContent;
                        suggestionsContainer.style.display = 'none';
                        $(pokeInput).autocomplete('enable');
                    })
                })

                pokeInput.addEventListener('input', function () {
                    pokeInput.classList.remove('red-background');
                    suggestionsContainer.style.display = 'none';
                    $(pokeInput).autocomplete('enable');
                })
            }
        }
    }

    for (let i = 1; i <= 6; i++) {
        const pokeInput = document.getElementById('pokemon' + i);
        const suggestionsContainer = document.getElementById('pokemon' + i + 'suggestion');

        //入力欄にフォーカスした時の処理
        pokeInput.addEventListener('focus', () => {
            if (pokeInput.classList.contains('red-background')) {
                suggestionsContainer.style.display = 'block';
                //内容によって表示する候補を格納
                let suggestions = [];
                Object.keys(formSuggestions).forEach(key => {
                    if (pokeInput.value == key) {
                        suggestions = formSuggestions[key];
                    }
                })
            }
        })

        //入力欄からフォーカスが外れた時の処理
        pokeInput.addEventListener('blur', () => {
            //候補をクリックした処理より先に走らないように少し遅らせる
            setTimeout(function () {
                const suggestionsContainer = document.getElementById('pokemon' + i + 'suggestion');
                suggestionsContainer.style.display = 'none';
            }, 200);
        })
    }

    //ページの読み込み時とリサイズ時にフォルム候補の横幅を変える
    window.addEventListener('load', setSuggestionWidth);
    window.addEventListener('resize', setSuggestionWidth);
    function setSuggestionWidth() {
        for (let i = 1; i <= 6; i++) {
            const pokemonId = 'pokemon' + i;
            const suggestionId = pokemonId + 'suggestion';
            const pokemonWidth = document.getElementById(pokemonId).offsetWidth;
            document.getElementById(suggestionId).style.width = pokemonWidth + 'px';
        }
    }
}

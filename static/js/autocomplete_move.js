$(function () {
    var moveList = [
        "3ぼんのや", "アーマーキャノン", "アームハンマー", "アイアンテール",
        "アイアンヘッド", "アイアンローラー", "アイススピナー", "アイスハンマー",
        "あおいほのお", "アクアカッター", "アクアジェット", "アクアステップ",
        "アクアテール", "アクアブレイク", "アクアリング", "あくうせつだん",
        "アクセルブレイク", "アクセルロック", "あくのはどう", "あくび",
        "アクロバット", "あさのひざし", "アシストパワー", "アシッドボム",
        "アストラルビット", "あなをほる", "あばれる", "あまいかおり",
        "あまえる", "あまごい", "あやしいひかり", "アロマミスト",
        "アンコール", "あんこくきょうだ", "いあいぎり", "いえき",
        "イカサマ", "いかりのこな", "いかりのまえば", "いじげんホール",
        "いじげんラッシュ", "いたみわけ", "いちゃもん", "いっちょうあがり",
        "いてつくしせん", "いとをはく", "イナズマドライブ", "いにしえのうた",
        "いのちがけ", "いのちのしずく", "いばる", "いびき",
        "いやしのすず", "いやしのねがい", "いやしのはどう", "いやなおと",
        "いわおとし", "いわくだき", "いわなだれ", "インファイト",
        "ウェーブタックル", "ウェザーボール", "うずしお", "うそなき",
        "うたう", "うたかたのアリア", "うちおとす", "ウッドハンマー",
        "ウッドホーン", "うっぷんばらし", "うつしえ", "うらみ",
        "うらみつらみ", "エアカッター", "エアスラッシュ", "エアロブラスト",
        "エコーボイス", "えだづき", "エナジーボール", "エレキネット",
        "エレキフィールド", "エレキボール", "エレクトロビーム", "えんまく",
        "オーバーヒート", "オーバードライブ", "オーラウイング", "オーラぐるま",
        "オーロラビーム", "オーロラベール", "おいかぜ", "おいわい",
        "おかたづけ", "おきみやげ", "おさきにどうぞ", "おたけび",
        "おだてる", "おちゃかい", "おどろかす", "おにび",
        "おはかまいり", "かいでんぱ", "かいりき", "カウンター",
        "かえんぐるま", "かえんのまもり", "かえんほうしゃ", "かえんボール",
        "かかとおとし", "かげうち", "かげぬい", "かげぶんしん",
        "かぜおこし", "かたきうち", "かたくなる", "カタストロフィ",
        "かなしばり", "かふんだんご", "かみくだく", "かみつく",
        "かみなり", "かみなりあらし", "かみなりのキバ", "かみなりパンチ",
        "からげんき", "からにこもる", "からをやぶる", "かわらわり",
        "ガードシェア", "ガードスワップ", "がむしゃら", "ガリョウテンセイ",
        "がんせきふうじ", "がんせきアックス", "がんせきほう", "きあいだま",
        "きあいだめ", "きあいパンチ", "きしかいせい", "キノコのほうし",
        "きまぐレーザー", "きゅうけつ", "きょけんとつげき", "きょじゅうざん",
        "きょじゅうだん", "キラースピン", "きりさく", "きりばらい",
        "きんぞくおん", "ギアチェンジ", "ギガインパクト", "ギガドレイン",
        "クイックターン", "くさのちかい", "くさむすび", "くさわけ",
        "くすぐる", "くちばしキャノン", "くらいつく", "クラブハンマー",
        "クリアスモッグ", "くろいきり", "くろいまなざし", "クロスサンダー",
        "クロスチョップ", "クロスフレイム", "クロスポイズン", "クロロブラスト",
        "グラススライダー", "グラスフィールド", "けたぐり", "げきりん",
        "ゲップ", "げんしのちから", "コーチング", "コートチェンジ",
        "コールドフレア", "こうげきしれい", "こうごうせい", "こうそくいどう",
        "こうそくスピン", "こおりのいぶき", "こおりのキバ", "こおりのつぶて",
        "こがらしあらし", "こごえるかぜ", "こごえるせかい", "コスモパワー",
        "コットンガード", "こなゆき", "このは", "このゆびとまれ",
        "コメットパンチ", "こらえる", "ころがる", "こわいかお",
        "こんげんのはどう", "ゴーストダイブ", "ゴールドラッシュ", "ゴッドバード",
        "さいきのいのり", "サイケこうせん", "サイコカッター", "サイコキネシス",
        "サイコショック", "サイコノイズ", "サイコファング", "サイコフィールド",
        "サイコブースト", "サイコブレイク", "サイコブレイド", "サイドチェンジ",
        "さいはい", "さいみんじゅつ", "さきおくり", "さばきのつぶて",
        "さむいギャグ", "さわぐ", "サンダーダイブ", "サンダープリズン",
        "シードフレア", "シェルアームズ", "シェルブレード", "しおづけ",
        "しおふき", "しおみず", "シザークロス", "したでなめる",
        "しっとのほのお", "しっぺがえし", "しっぽきり", "しっぽをふる",
        "しねんのずつき", "しびれごな", "しめつける", "シャカシャカほう",
        "シャドークロー", "シャドーダイブ", "シャドーパンチ", "シャドーボール",
        "シャドーレイ", "しょうりのまい", "しろいきり", "しんくうは",
        "しんそく", "しんぴのちから", "しんぴのつるぎ", "しんぴのまもり",
        "シンプルビーム", "Gのちから", "ジェットパンチ", "じこあんじ",
        "じこさいせい", "じごくづき", "じしん", "じたばた",
        "じだんだ", "じならし", "じばく", "じばそうさ",
        "ジャイロボール", "じゃどくのくさり", "じゃれつく", "ジャングルヒール",
        "じゅうでん", "10まんばりき", "10まんボルト", "じゅうりょく",
        "じわれ", "じんつうりき", "じんらい", "スイープビンタ",
        "すいとる", "すいりゅうれんだ", "スキルスワップ", "スケイルショット",
        "スケイルノイズ", "スケッチ", "スチームバースト", "すてゼリフ",
        "すてみタックル", "ステルスロック", "ストーンエッジ", "すなあつめ",
        "すなあらし", "すなかけ", "すなじごく", "スパーク",
        "スピードスター", "スピードスワップ", "スマートホーン", "スモッグ",
        "すりかえ", "スレッドトラップ", "ずつき", "せいちょう",
        "せいなるつるぎ", "せいなるほのお", "ぜったいれいど", "ソーラービーム",
        "ソーラーブレード", "ソウルクラッシュ", "ソウルビート", "そらをとぶ",
        "タールショット", "たいあたり", "タキオンカッター", "たきのぼり",
        "たくわえる", "たたりめ", "たたきつける", "たつまき",
        "たてこもる", "タネばくだん", "タネマシンガン", "タマゴうみ",
        "ダークホール", "だいちのちから", "だいちのはどう", "だいばくはつ",
        "ダイビング", "だいふんげき", "ダイマックスほう", "だいもんじ",
        "ダイヤストーム", "だくりゅう", "ダストシュート", "ダブルアタック",
        "ダブルウイング", "ダメおし", "だんがいのつるぎ", "ちいさくなる",
        "ちからをすいとる", "ちきゅうなげ", "チャージビーム", "チャームボイス",
        "ちょうおんぱ", "ちょうのまい", "ちょうはつ", "ついばむ",
        "ツインビーム", "つきのひかり", "つけあがる", "つじぎり",
        "ツタこんぼう", "つっぱり", "つつく", "つのでつく",
        "つのドリル", "つばさでうつ", "つばめがえし", "つぶらなひとみ",
        "つぼをつく", "つめとぎ", "つららおとし", "つららばり",
        "つるぎのまい", "つるのムチ", "てかげん", "テクスチャー",
        "テクスチャー2", "てだすけ", "てっていこうせん", "てっぺき",
        "テラクラスター", "テラバースト", "テレポート", "てをつなぐ",
        "てんしのキッス", "であいがしら", "DDラリアット", "デカハンマー",
        "デコレーション", "でんきショック", "でんげきは", "でんこうせっか",
        "でんこうそうげき", "でんじは", "でんじふゆう", "でんじほう",
        "トーチカ", "とおせんぼう", "とおぼえ", "ときのほうこう",
        "とぐろをまく", "とける", "とっしん", "とっておき",
        "とどめばり", "とびかかる", "とびつく",
        "とびはねる", "とびひざげり", "ともえなげ", "トライアタック",
        "トリック", "トリックフラワー", "トリックルーム", "トリプルアクセル",
        "トリプルキック", "トリプルダイブ", "トロピカルキック", "とんぼがえり",
        "どくガス", "どくづき", "どくどく", "どくどくのキバ",
        "どくのいと", "どくのこな", "どくばり", "どくばりセンボン",
        "どくびし", "ドゲザン", "どげざつき", "ドラゴンアロー",
        "ドラゴンエール", "ドラゴンエナジー", "ドラゴンクロー", "ドラゴンダイブ",
        "ドラゴンテール", "ドラゴンハンマー", "ドラムアタック", "ドリルくちばし",
        "ドリルライナー", "ドレインキッス", "ドレインパンチ", "どろかけ",
        "どろぼう", "ドわすれ", "ないしょばなし", "ナイトバースト",
        "ナイトヘッド", "なかまづくり", "なかよくする", "なきごえ",
        "なげつける", "なまける", "なみだめ", "なみのり",
        "なやみのタネ", "なりきり", "ニードルガード", "にぎりつぶす",
        "ニトロチャージ", "にどげり", "にほんばれ", "にらみつける",
        "ねがいごと", "ねこだまし", "ネコにこばん", "ねごと",
        "ネズミざん", "ねっさのあらし", "ねっさのだいち", "ねっとう",
        "ねっぷう", "ねばねばネット", "ねむりごな", "ねむる",
        "ねらいうち", "ねをはる", "ねんりき", "のしかかり",
        "のみこむ", "のろい", "ハートスワップ", "ハードプラント",
        "ハードプレス", "はいすいのじん", "ハイドロカノン", "ハイドロスチーム",
        "ハイドロポンプ", "ハイパードリル", "ハイパーボイス", "はいよるいちげき",
        "はかいこうせん", "はがねのつばさ", "はきだす", "ハサミギロチン",
        "はさむ", "はたきおとす", "はたく", "はっけい",
        "はっぱカッター", "ハッピータイム", "はどうだん", "はなびらのまい",
        "はなふぶき", "はねやすめ", "はねる", "ハバネロエキス",
        "はめつのねがい", "はやてがえし", "はらだいこ", "はるのあらし",
        "バークアウト", "ばかぢから", "ばくおんぱ", "ばくれつパンチ",
        "バトンタッチ", "バブルこうせん", "バリアーラッシュ", "バレットパンチ",
        "パラボラチャージ", "パワーウィップ", "パワーシェア", "パワーシフト",
        "パワージェム", "パワースワップ", "パワートリック", "パワフルエッジ",
        "ヒートスタンプ", "ひかりのかべ", "ひけん・ちえなみ", "ひっかく",
        "ひっくりかえす", "ひのこ", "ひゃっきやこう", "ひやみず",
        "ひょうざんおろし", "びりびりちくちく", "ビルドアップ", "ファストガード",
        "ふいうち", "ふういん", "フェアリーロック", "フェイタルクロー",
        "フェイント", "フェザーダンス", "フォトンゲイザー", "ふきとばし",
        "ふくろだたき", "ふしょくガス", "ふぶき", "ふみつけ",
        "フライングプレス", "フラフラダンス", "フラワーヒール", "フリーズドライ",
        "フリーズボルト", "フルールカノン", "ふるいたてる", "フレアソング",
        "フレアドライブ", "ふんえん", "ふんか", "ふんどのこぶし",
        "Vジェネレート", "ぶきみなじゅもん", "ぶちかまし", "ブラストバーン",
        "ブラッドムーン", "ブリザードランス", "ブレイククロー", "ブレイズキック",
        "ブレイブチャージ", "ブレイブバード", "ぶんまわす", "プリズムレーザー",
        "プレゼント", "ヘドロウェーブ", "ヘドロこうげき", "ヘドロばくだん",
        "ヘビーボンバー", "へびにらみ", "へんしん", "ベノムショック",
        "ホイールスピン", "ほうでん", "ほうふく", "ほえる",
        "ほおばる", "ほしがる", "ほたるび", "ほっぺすりすり",
        "ほのおのうず", "ほのおのキバ", "ほのおのちかい", "ほのおのパンチ",
        "ほのおのまい", "ほのおのムチ", "ほろびのうた", "ボーンラッシュ",
        "ぼうぎょしれい", "ぼうふう", "ボディプレス", "ボルテッカー",
        "ボルトチェンジ", "ポイズンテール", "ポルターガイスト", "まきつく",
        "まきびし", "マグマストーム", "マジカルシャイン", "マジカルフレイム",
        "マジカルリーフ", "マジックルーム", "マッドショット", "マッハパンチ",
        "まとわりつく", "まねっこ", "まほうのこな", "まもる",
        "まるくなる", "みかづきのいのり", "みかづきのまい", "みがわり",
        "みきり", "ミサイルばり", "ミストバースト", "ミストフィールド",
        "ミストボール", "みずあめボム", "みずしゅりけん", "みずでっぽう",
        "みずのちかい", "みずのはどう", "みずびたし", "みだれづき",
        "みだれひっかき", "みちづれ", "みねうち", "ミラーコート",
        "ミラータイプ", "みらいよち", "ミルクのみ", "みわくのボイス",
        "みをけずる", "ムーンフォース", "むしくい", "むしのさざめき",
        "むしのていこう", "むねんのつるぎ", "めいそう", "メガトンキック",
        "メガトンパンチ", "メガドレイン", "メガホーン", "めざめるダンス",
        "メタルクロー", "メタルバースト", "メテオドライブ", "メテオビーム",
        "メロメロ", "もえあがるいかり", "もえつきる", "ものまね",
        "もりののろい", "もろはのずつき", "やきつくす", "やけっぱち",
        "やどりぎのタネ", "ゆきげしき", "ゆきなだれ", "ゆびをふる",
        "ゆめくい", "ようかいえき", "ようせいのかぜ", "らいげき",
        "ライジングボルト", "らいめいげり", "ラスターカノン", "ラスターパージ",
        "リーフストーム", "リーフブレード", "リサイクル", "リフレクター",
        "りゅうせいぐん", "りゅうのいぶき", "りゅうのはどう", "りゅうのまい",
        "りんごさん", "りんしょう", "ルミナコリジョン", "レイジングブル",
        "れいとうパンチ", "れいとうビーム", "れんごく", "れんぞくぎり",
        "ローキック", "ロックオン", "ロックカット", "ロックブラスト",
        "ワイドガード", "ワイドフォース", "ワイドブレイカー", "ワイルドボルト",
        "わたほうし", "わるあがき", "わるだくみ", "ワンダースチーム",
        "ワンダールーム"
    ];

    var form = {
        'ドレパン': 'ドレインパンチ',
        'ドレキ': 'ドレインキッス',
        'アクジェ': 'アクアジェット',
        'フリドラ': 'フリーズドライ',
        'ムンフォ': 'ムーンフォース',
        'アイヘ': 'アイアンヘッド',
        'シャドボ': 'シャドーボール',
        'ハイボ': 'ハイパーボイス',
        'りゅうまい': 'りゅうのまい',
        'ほのまい': 'ほのおのまい',
        'シャドクロ': 'シャドークロー',
        'つぶて': 'こおりのつぶて',
        'ほうしゃ': 'かえんほうしゃ',
        'とりる': 'トリックルーム',
        'じゅうまんばりき': '10まんばりき',
        'じゅうまんぼると': '10まんボルト',
        'さんぼんのや': '3ぼんのや'
    };

    function startsWithIgnoreCase(str, term) {
        return ignoreKana(str.toLowerCase()).indexOf(term) === 0;
    }

    function ignoreKana(str) {
        return str.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

    $(".move-input").autocomplete({
        source: function (request, response) {
            var term = ignoreKana(request.term.toLowerCase());

            var matchingItems = $.grep(moveList.concat(Object.keys(form)), function (item) {
                return startsWithIgnoreCase(item, term);
            });

            matchingItems = matchingItems.map(function (item) {
                return form[item] || item;
            });

            response(matchingItems.slice(0, 4));
        },
        position: { my: "left top-1", at: "left bottom", collision: "none" },
        delay: 100,
        autoFocus: true,
        select: function (event, ui) {
            var currentInput = $(this);
            var nextInput = currentInput.parent('span').next('span').find('input').first();;

            if (nextInput.length > 0) {
                nextInput.focus();
            } else {
                var nextInput = currentInput.closest('.move-group').parent('div').next('div').find('.input-group').find('input[type="search"]').first();
                nextInput.focus();
            }
        }
    });
});

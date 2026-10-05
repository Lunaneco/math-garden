# マスガーデン

着せ替え、ペット、お店のおてつだいとマイガーデンを楽しみながら、5歳から12歳の段階に合う算数で遊ぶブラウザーゲームです。

公開サイト: https://lunaneco.github.io/math-garden/

## ローカルで遊ぶ

```sh
python3 -m http.server 4599 --bind 127.0.0.1
```

http://127.0.0.1:4599/ を開きます。学習進捗・庭・衣装・ペットは、そのブラウザーのlocalStorageに保存します。ローカル版と公開版は異なる保存先です。

## 公開

`main`へのpushでGitHub Actionsが検証・公開用ファイルの抽出を行い、GitHub Pagesへ自動デプロイします。

```sh
node tests/deployment-readiness.mjs
python3 scripts/build-release.py
```

コードから参照する画像や音声を追加したときは、`python3 scripts/build-release.py --prepare-git`で公開ソースの許可リストを更新してからcommitします。

`dist`にはゲームが参照するHTML・JavaScript・CSS・画像・録音済み音声だけを収録します。作業記録、生成指示、元画像、バックアップ、セーブデータは公開しません。

公開版の読み上げは収録済みのにゃんるな音声を使います。未収録問題は「音声なし」と表示します。公開版から訪問者のローカル音声サーバーへ接続することはありません。

サーバー側のユーザー登録・課金・進捗同期はありません。

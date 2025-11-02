# oj-short

[English](README.md) | 日本語

`oj-short`は、競技プログラミングのワークフローを効率化するために設計されたコマンドラインインターフェース（CLI）ツールです。[online-judge-tools/oj-tools](https://github.com/online-judge-tools/oj-tools)の便利なラッパーとして機能し、問題のダウンロード、コードのテスト、解答の提出プロセスを簡素化します。

このツールはTypeScriptで構築されており、[Bun](https://bun.sh/)ランタイム上で**のみ**動作します。

## 特徴

- **問題のダウンロード**: AtCoder、Codeforcesなどのさまざまなオンラインジャッジから、問題の詳細とサンプルテストケースを素早く取得します。
- **解答のテスト**: ダウンロードしたサンプルケースに対して、あなたのコードを自動的にテストします。
- ~~**コードの提出**: コマンドラインから直接、解答を提出します。~~ 現在この機能は無効化されています。
- **カスタマイズ可能**: あらゆるプログラミング言語に対して、カスタムのビルドコマンドと実行コマンドを設定できます。
- **URL解決**: 簡潔な識別子からコンテストのURLを生成することをサポートします。

## 前提条件

`oj-short`を使用する前に、以下をインストールする必要があります:

1. **[Bun](https://bun.sh/)**: このプロジェクトはBunランタイムを使用します。
2. **[online-judge-tools](https://github.com/online-judge-tools/oj)**: オンラインジャッジと対話するためのコア依存関係です。

    ```shell
    pip3 install online-judge-tools
    ```

## インストール

npmレジストリからインストール:

```shell
bun install -g oj-short
```

または、配布されている[コンパイル済みのバイナリ](https://github.com/e6nlaq/oj-short/releases)を利用してください。

## 使い方

このツールは、`get`と`subm`の2つの主要なコマンドを提供します。

### `get`

問題とそのテストケースをダウンロードします。

**コマンド:**

```shell
get <site> <contest> [problem]
```

**引数:**

- `<site>`: オンラインジャッジの短いコード（例: `ac` for AtCoder, `cf` for Codeforces）。

  - `ac`, `atcoder`: AtCoder

  - `cf`, `codeforces`: Codeforces

  - `cf_gym`, `codeforces_gym`: Codeforces Gym

  - `yc`, `yukicoder`: Yukicoder

  - `aoj`, `aizuonlinejudge`: Aizu Online Judge

  - `hr`, `hackerrank`: HackerRank

  - `lc`, `librarychecker`: Library Checker

  - `url`: 直接URLを入力
- `<contest>`: コンテストID。
- `[problem]`: 問題ID（一部のサイトではオプション）。

**例:**

```shell
# AtCoder Beginner Contest 100, Problem Aをダウンロード
get ac abc100 a
```

このコマンドは以下を実行します:

1. URLを解決します: `https://atcoder.jp/contests/abc100/tasks/abc100_a`
2. `oj.config.json`を問題のURLで更新します。
3. `oj-tools`を使用して、サンプルケースを含む`test`ディレクトリを作成します。

### `subm`

解答ファイルをテストし ~~、提出し~~ ます。

**コマンド:**

```shell
subm <filepath> [options]
```

**引数:**

- `<filepath>`: 解答ファイルへのパス。

**オプション:**

- `-s, --strict`: 厳格モード(末尾の空白や改行を厳密に判定)でテストを実行します。
- `-y, --yes`: 提出確認に対して自動的に「yes」と回答します。
- `-t, --only-test`: 提出せずにテストのみを実行します。

**例:**

```shell
# main.pyをテストして提出
subm main.py --yes
```

このコマンドは以下を実行します：

1. `oj.config.json`で`.py`ファイルの実行コマンドを検索します。
2. コードをコンパイルします（ビルドコマンドが定義されている場合）。
3. `oj t`を使用してテストを実行します。
4. ~~`oj s`を使用して解答を提出します。~~

## 設定

`oj.config.json`ファイルを編集することで、ビルドコマンドと実行コマンドをカスタマイズできます。

設定ファイルは以下のような形式です:

```json
{
    "run": {
        ".py": {
            "build": "",
            "run": "python3 $0",
            "lang": 5063
        }
    },
    "submit": false,
    "problem_url": "https://atcoder.jp/contests/abc100/tasks/abc100_a"
}
```

- `run`: ファイル拡張子（例: `.py`, `.cpp`）を、対応するビルドおよび実行設定にマッピングするオブジェクト。
  - `build`: コードをコンパイルするコマンド。`$0`はソースファイルパスのプレースホルダーです。
  - `run`: コンパイル済みコードを実行するコマンド。
  - `lang`: ~~提出用の言語ID（オンラインジャッジ固有）。~~ これは現在不要です。
- `submit`: 提出が有効かどうかを示すブール値。これは`get`コマンドによって自動的に管理されます。
- `problem_url`: 現在の問題のURL。`get`コマンドによって管理されます。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

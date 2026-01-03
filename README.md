# oj-short

English | [日本語](README.ja.md)

`oj-short` is a command-line interface (CLI) tool designed to streamline the competitive programming workflow. It serves as a convenient wrapper for [online-judge-tools/oj-tools](https://github.com/online-judge-tools/oj-tools), simplifying the process of downloading problems, testing code, and submitting solutions.

This tool is built with TypeScript and runs **only** on the [Bun](https://bun.sh/) runtime.

## Features

- **Download Problems**: Quickly fetch problem details and sample test cases from various online judges like AtCoder, Codeforces, etc.
- **Test Solutions**: Automatically test your code against downloaded sample cases.
- **Submit Code**: Submit solutions directly from the command line. This works in some situations like AtCoder during contests.
- **Customizable**: Configure custom build and run commands for any programming language.
- **URL Resolution**: Supports generating contest URLs from concise identifiers.

## Prerequisites

Before using `oj-short`, you need to install the following:

1. **[Bun](https://bun.sh/)**: This project uses the Bun runtime.
2. **[online-judge-tools](https://github.com/online-judge-tools/oj)**: A core dependency for interacting with online judges.

    ```shell
    pip3 install online-judge-tools
    # or use uv
    uv tool install online-judge-tools
    ```

## Installation

Install from the npm registry:

```shell
bun install -g oj-short@latest
```

Or use the distributed [compiled binaries](https://github.com/e6nlaq/oj-short/releases).

## Usage

The tool provides two main commands: `get` and `subm`.

### `get`

Downloads a problem and its test cases.

**Command:**

```shell
get <site> <contest> [problem] [options]
```

**Arguments:**

- `<site>`: Short code for the online judge (e.g., `ac` for AtCoder, `cf` for Codeforces).

  - `ac`, `atcoder`: AtCoder

  - `cf`, `codeforces`: Codeforces

  - `cf_gym`, `codeforces_gym`: Codeforces Gym

  - `yc`, `yukicoder`: Yukicoder

  - `aoj`, `aizuonlinejudge`: Aizu Online Judge

  - `hr`, `hackerrank`: HackerRank

  - `lc`, `librarychecker`: Library Checker

  - `url`: Direct URL input
- `<contest>`: Contest ID.
- `[problem]`: Problem ID (optional for some sites).

**Options:**

- `-s, --submit`: Enables submission.

**Example:**

```shell
# Download AtCoder Beginner Contest 100, Problem A
get ac abc100 a
```

This command performs the following:

1. Resolves the URL: `https://atcoder.jp/contests/abc100/tasks/abc100_a`
2. Updates `oj.config.json` with the problem URL.
3. Uses `oj-tools` to create a `test` directory containing sample cases.

### `subm`

Tests and submits a solution file.

**Command:**

```shell
subm <filepath> [options]
```

**Arguments:**

- `<filepath>`: Path to the solution file.

**Options:**

- `-s, --strict`: Runs tests in strict mode (strictly judging trailing spaces and newlines).
- `-y, --yes`: Automatically answers "yes" to submission confirmation.
- `-t, --only-test`: Runs only tests without submitting.

**Example:**

```shell
# Test and submit main.py
subm main.py --yes
```

This command performs the following:

1. Searches `oj.config.json` for the execution command for `.py` files.
2. Compiles the code (if a build command is defined).
3. Runs tests using `oj t`.
4. ~~Submits the solution using `oj s`.~~

## Configuration

You can customize build and run commands by editing the `oj.config.json` file.

The configuration file format is as follows:

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

- `run`: Object mapping file extensions (e.g., `.py`, `.cpp`) to corresponding build and run settings.
  - `build`: Command to compile the code. `$0` is a placeholder for the source file path.
  - `run`: Command to execute the compiled code.
  - `lang`: ~~Language ID for submission (online judge specific).~~ This is currently not needed.
- `submit`: Boolean indicating whether submission is enabled. This is automatically managed by the `get` command.
- `problem_url`: URL of the current problem. Managed by the `get` command.

## License

This project is licensed under the MIT License.

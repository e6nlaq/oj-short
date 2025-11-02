# oj-short

`oj-short` is a command-line interface (CLI) tool designed to streamline the workflow of competitive programming. It acts as a convenient wrapper around [online-judge-tools](https://github.com/online-judge-tools/oj), simplifying the process of downloading problems, testing code, and submitting solutions.

This tool is built with TypeScript and runs **only** on the [Bun](https://bun.sh/) runtime.

## Features

- **Download Problems**: Quickly fetch problem details and sample test cases from various online judges like AtCoder, Codeforces, and more.
- **Test Solutions**: Automatically test your code against the downloaded sample cases.
- ~~**Submit Code**: Submit your solution directly from the command line.~~ This feature is currently disabled.
- **Customizable**: Configure custom build and run commands for any programming language.
- **URL Resolution**: Supports generating contest URLs from concise identifiers.

## Prerequisites

Before using `oj-short`, you need to install the following:

1. **[Bun](https://bun.sh/)**: This project uses the Bun runtime.
2. **[online-judge-tools](https://github.com/online-judge-tools/oj)**: The core dependency for interacting with online judges.

    ```shell
    pip3 install online-judge-tools
    ```

## Installation

Install from npm registry:

```shell
bun install -g oj-short
```

Alternatively, you can use the [pre-compiled binaries](https://github.com/e6nlaq/oj-short/releases).

## Usage

The tool provides two main commands: `get` and `subm`.

### `get`

Downloads a problem and its test cases.

**Command:**

```shell
get <site> <contest> [problem]
```

**Arguments:**

- `<site>`: A short code for the online judge (e.g., `ac` for AtCoder, `cf` for Codeforces).
- `<contest>`: The contest ID.
- `[problem]`: The problem ID (optional for some sites).

**Example:**

```shell
# Download AtCoder Beginner Contest 100, Problem A
get ac abc100 a
```

This command will:

1. Resolve the URL: `https://atcoder.jp/contests/abc100/tasks/abc100_a`
2. Update `oj.config.json` with the problem URL.
3. Create a `test` directory with the sample cases using `oj-tools`.

### `subm`

Tests your solution file ~~and submits it~~.

**Command:**

```shell
subm <filepath> [options]
```

**Arguments:**

- `<filepath>`: The path to your solution file.

**Options:**

- `-s, --strict`: Run tests in strict mode (strict judgment of trailing spaces and newlines).
- `-y, --yes`: Automatically answer "yes" to the submission confirmation.
- `-t, --only-test`: Only run tests without submitting.

**Example:**

```shell
# Test and submit main.py
subm main.py --yes
```

This command will:

1. Look up the run command for `.py` files in `oj.config.json`.
2. Compile the code (if a build command is defined).
3. Run tests using `oj t`.
4. ~~Submit the solution using `oj s`.~~

## Configuration

You can customize build and run commands by editing the `oj.config.json` file.

The configuration file is in the following format:

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

- `run`: An object mapping file extensions (e.g., `.py`, `.cpp`) to their corresponding build and run configurations.
  - `build`: The command to compile your code. `$0` is a placeholder for the source file path.
  - `run`: The command to execute your compiled code.
  - `lang`: ~~The language ID for submission (specific to the online judge).~~ This is currently unnecessary.
- `submit`: A boolean indicating whether submission is enabled. This is automatically managed by the `get` command.
- `problem_url`: The URL of the current problem, managed by the `get` command.

## License

This project is licensed under the MIT License.

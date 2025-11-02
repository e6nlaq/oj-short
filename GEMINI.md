# GEMINI.md

## Project Overview

This project, `oj-short`, is a command-line interface (CLI) tool designed to streamline the process of participating in online programming contests. It is written in TypeScript and leverages the `bun` runtime.

The tool provides two primary commands:

- `get`: Fetches programming contest problems from various online judge platforms like AtCoder and Codeforces, setting up the local environment for testing.
- `subm`: Compiles, runs, tests, and submits solutions to the fetched problems.

It appears to be a wrapper around the popular `oj-tools` library, simplifying its usage with a configuration-driven approach.

## Building and Running

### Prerequisites

- [Bun](https://bun.sh/) is required to run this project.
- `oj-tools` (online-judge-tools) seems to be a core dependency for the actual interaction with online judges.

### Key Commands

The `package.json` file defines the following scripts:

- **`bun run build`**: Compiles the TypeScript source code into JavaScript.
- **`bun run get -- <args>`**: Executes the `get` command to download a problem.
  - Example: `bun run get -- ac abc100 a`
- **`bun run subm -- <args>`**: Executes the `subm` command to test and submit a solution file.
  - Example: `bun run subm -- main.py`
- **`bun run format`**: Formats the codebase using Biome.
- **`bun run check`**: Lints and checks the codebase for errors using Biome.

## Development Conventions

### Code Style and Formatting

The project uses [Biome](https://biomejs.dev/) for code formatting, linting, and import organization. The configuration is stored in `biome.json`. Key aspects of the style include:

- 4-space indentation.
- `lf` line endings.
- Double quotes for strings in JavaScript/TypeScript.

### Commit Messages

Commit messages are expected to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is enforced by `commitlint` and its configuration in `commitlint.config.js`.

### Configuration

The tool uses a local `oj.config.json` file for user-specific settings. This file allows users to define custom build and run commands for different programming languages. A default configuration is created if one doesn't exist.

### Project Structure

- `src/`: Contains the TypeScript source code.
  - `get.ts`: Implements the `get` command.
  - `subm.ts`: Implements the `subm` command.
  - `base/`: Contains core logic for configuration, shell commands, and startup procedures.
  - `cli/`: Contains CLI-related utilities like logging.
- `test/`: This directory is used by `oj-tools` to store test cases for downloaded problems. It is removed and recreated by the `get` command.

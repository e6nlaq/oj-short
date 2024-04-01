#!/usr/bin/env -S node --no-warnings
import { Command } from '@commander-js/extra-typings';

import { load_config, RunConfig } from './base/config.js';
import get_ext from './base/get_ext.js';
import { error, info } from './cli/log.js';
import { system } from './base/shell.js';
import { existsSync } from 'fs';
import startup from './base/startup.js';

const file_command: Record<string, RunConfig> = {
    cpp: {
        build: 'g++ $0 --std=c++23 -I . -O2',
        run: './a.out',
    },
    c: {
        build: 'gcc $0',
        run: './a.out',
    },
    py: {
        build: '',
        run: 'python3 $0',
        lang: 5055,
    },
    js: {
        build: '',
        run: 'node $0',
    },
    ts: {
        build: 'tsc $0 --outfile a.js',
        run: 'node a.js',
    },
};

const program = new Command()
    .argument('<filepath>')
    .option('-e [e]', '', false)
    .option('-s, --strict', '', false)
    .option('-y, --yes', '', false)
    .option('-t, --only-test', '', false)
    .action((path, option) => {
        startup();

        // ファイル存在チェック
        if (!existsSync(path)) {
            error(`${path} does not exist`);
            process.exit(1);
        }

        // Config読み込み
        const config = load_config();
        const command_user = config.run;
        const keys = Object.keys(command_user);
        for (let i = 0; i < keys.length; ++i) {
            file_command[keys[i]] = command_user[keys[i]];
        }

        const arg: string[] = [];

        if (!config.submit) {
            option.onlyTest = true;
        }

        const ext = get_ext(path);
        if (file_command[ext] === undefined) {
            error('Unidentified extensions');
            info('Add the command to `oj.config.json`.');
            process.exit(1);
        }

        // Option
        if (option.e === true) {
            option.e = '9';
        }

        // 引数構築

        // コンパイル
        if (file_command[ext].build !== '') {
            arg.push(file_command[ext].build.replace('$0', '"' + path + '"'));
            arg.push('&&');
        }

        // 実行
        arg.push(
            `oj t -c "${file_command[ext].run.replace('$0', '"' + path + '"')}"`
        );

        if (option.e !== false) {
            arg.push(`-e 1e-${option.e}`);
        }

        if (!option.strict) {
            arg.push('-S -N');
        }

        // 提出
        if (!option.onlyTest) {
            arg.push(`&& oj submit ${config.problem_url} ${path}`);

            if (option.yes) {
                arg.push('--yes');
            }

            if (file_command[ext].lang !== undefined) {
                arg.push('-l', String(file_command[ext].lang));
            }
        }

        info(`Run command: ${arg.join(' ')}`);
        system(arg.join(' '));
    });
program.parse();

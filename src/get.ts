#!/usr/bin/env -S node --no-warnings
import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';
import { rmSync } from 'fs';

import startup from './base/startup.js';
import packageJson from '../package.json' assert { type: 'json' };
import { error, info } from './cli/log.js';
import { oj } from './base/shell.js';
import { write_info } from './base/config.js';

// TODO: 説明書く
const program = new Command()
    .name('get')
    .version(packageJson.version)
    .arguments('<site-code> <contests> [problem-id]')
    .action((site_code, contests, problem_id) => {
        startup();

        let ok_problem_undefined = false;
        let submit = false;
        let url = 'https://example.com';
        if (site_code === 'ac' || site_code === 'atcoder') {
            url = `https://atcoder.jp/contests/${contests}/tasks/${contests.replace('-', '_')}_${problem_id}`;
            submit = true;
        } else if (site_code === 'cf' || site_code === 'codeforces') {
            url = `https://codeforces.com/contest/${contests}/problem/${problem_id}`;
        } else if (site_code === 'cf_gym' || site_code === 'codeforces_gym') {
            url = `https://codeforces.com/gym/${contests}/problem/${problem_id}`;
        } else if (site_code === 'yc' || site_code === 'yukicoder') {
            url = `https://yukicoder.me/problems/no/${contests}`;
            ok_problem_undefined = true;
        } else if (site_code === 'url') {
            url = contests;
            ok_problem_undefined = true;

            if (contests.match(/^https?:\/\/atcoder\.jp\/contests\/*/)) {
                submit = true;
            }
        } else {
            error('Invalid site code');
            process.exit(1);
        }

        if (!ok_problem_undefined && problem_id === undefined) {
            error('Problem code is missing.');
            process.exit(1);
        }

        info(`URL resolved: ${url}`);

        write_info(submit, url);

        info(
            `Submit problem?: ${submit ? chalk.bold.green('Yes') : chalk.bold.red('No')}`
        );

        rmSync('test', { recursive: true, force: true });

        oj(['d', url]);
    });

program.parse();

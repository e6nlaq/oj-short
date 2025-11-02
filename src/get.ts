#!/usr/bin/env bun
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";
import packageJson from "../package.json";
import { write_info } from "./base/config.js";
import { oj } from "./base/shell.js";
import startup from "./base/startup.js";
import { error, info } from "./cli/log.js";

// TODO: 説明書く
const program = new Command()
    .name("get")
    .version(packageJson.version)
    .arguments("<site-code> <contests> [problem-id]")
    .action((site_code, contests, problem_id) => {
        startup();

        let ok_problem_undefined = false;
        const submit = false;
        let url = "https://example.com";
        if (site_code === "ac" || site_code === "atcoder") {
            url = `https://atcoder.jp/contests/${contests}/tasks/${contests.replaceAll("-", "_")}_${problem_id}`;
        } else if (site_code === "cf" || site_code === "codeforces") {
            url = `https://codeforces.com/contest/${contests}/problem/${problem_id}`;
        } else if (site_code === "cf_gym" || site_code === "codeforces_gym") {
            url = `https://codeforces.com/gym/${contests}/problem/${problem_id}`;
        } else if (site_code === "yc" || site_code === "yukicoder") {
            url = `https://yukicoder.me/problems/no/${contests}`;
            ok_problem_undefined = true;
        } else if (site_code === "aoj" || site_code === "aizuonlinejudge") {
            url = `https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${contests}`;
            ok_problem_undefined = true;
        } else if (site_code === "hr" || site_code === "hackerrank") {
            url = `https://www.hackerrank.com/challenges/${contests}/problem`;
            ok_problem_undefined = true;
        } else if (site_code === "lc" || site_code === "librarychecker") {
            url = `https://judge.yosupo.jp/problem/${contests}`;
            ok_problem_undefined = true;
        } else if (site_code === "url") {
            url = contests;
            ok_problem_undefined = true;
        } else {
            error(`Invalid site code: ${chalk.bold.red(site_code)}`);
            process.exit(1);
        }

        if (!ok_problem_undefined && problem_id === undefined) {
            error("Problem code is missing.");
            process.exit(1);
        }

        info(`URL resolved: ${url}`);

        write_info(submit, url);

        info(
            `Submit problem?: ${submit ? chalk.bold.green("Yes") : chalk.bold.red("No")}`,
        );

        rmSync("test", { recursive: true, force: true });

        oj(["d", url]);

        if (!existsSync("test")) {
            mkdirSync("test", { recursive: true });
        }
    });

program.parse();

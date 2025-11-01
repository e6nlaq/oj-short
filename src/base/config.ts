import * as fs from "node:fs";

export interface Config {
	run: Record<string, RunConfig>;
	submit: boolean;
	problem_url: string;
}

export interface RunConfig {
	build: string;
	run: string;
	lang?: number;
}

export function load_config(): Config {
	init_config();

	const config = fs.readFileSync("oj.config.json", "utf8");

	return JSON.parse(config);
}

export function write_config(config: Config): void {
	fs.writeFileSync("oj.config.json", JSON.stringify(config, null, 4));
}

export function write_info(submit: boolean, url: string) {
	const config = load_config();

	config.submit = submit;
	config.problem_url = url;
	write_config(config);
}

export function init_config() {
	if (fs.existsSync("oj.config.json")) {
		return;
	}

	const default_config: Config = {
		run: {},
		submit: false,
		problem_url: "https://example.com",
	};

	fs.writeFileSync("oj.config.json", JSON.stringify(default_config));
}

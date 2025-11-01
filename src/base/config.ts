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

export async function load_config(): Promise<Config> {
    await init_config();

    const config = await Bun.file("oj.config.json").text();

    return JSON.parse(config);
}

export async function write_config(config: Config): Promise<void> {
    await Bun.write("oj.config.json", JSON.stringify(config, null, 4));
}

export async function write_info(submit: boolean, url: string) {
    const config = await load_config();

    config.submit = submit;
    config.problem_url = url;
    await write_config(config);
}

export async function init_config() {
    if (await Bun.file("oj.config.json").exists()) {
        return;
    }

    const default_config: Config = {
        run: {},
        submit: false,
        problem_url: "https://example.com",
    };

    await Bun.write("oj.config.json", JSON.stringify(default_config));
}

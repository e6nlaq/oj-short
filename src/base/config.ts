import { z } from "zod";
import { error } from "../cli/log";

const runConfigSchema = z.strictObject({
    build: z.string().optional(),
    run: z.string(),
    lang: z.int().positive().optional(),
});

const extSchema = z.union([
    z.literal(""),
    z
        .string()
        .regex(/^\.[a-zA-Z0-9]+$/, "Extensions must start with a dot")
        .trim()
        .toLowerCase(),
]);

const configSchema = z.strictObject({
    run: z.record(extSchema, runConfigSchema),
    submit: z.boolean(),
    problem_url: z.url({ protocol: /^(https|http)$/ }),
});

export type Config = z.infer<typeof configSchema>;

export type RunConfig = z.infer<typeof runConfigSchema>;

export async function load_config(): Promise<Config> {
    await init_config();

    const configText = await Bun.file("oj.config.json").text();
    let configJson: Config;
    try {
        configJson = JSON.parse(configText);
    } catch (e: unknown) {
        error(`Config is not JSON.`);
        if (e instanceof Error) {
            error(e.message);
        }
        process.exit(1);
    }

    const result = configSchema.safeParse(configJson);
    if (!result.success) {
        error(`Invalid config.\n`);
        const pretty = z.prettifyError(result.error);
        const logs = pretty.split("\n");
        for (let i = 0; i < logs.length; ++i) {
            error(logs[i]);
        }

        process.exit(1);
    }

    return result.data;
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

const targets: Bun.Build.Target[] = [
    "bun-linux-x64",
    "bun-linux-arm64",
    "bun-darwin-x64",
    "bun-darwin-arm64",
];

for (const target of targets) {
    await Bun.build({
        compile: {
            target,
            outfile: `./bin/get-${target}`,
        },
        entrypoints: ["src/get.ts"],
    });
    await Bun.build({
        compile: {
            target,
            outfile: `./bin/subm-${target}`,
        },
        entrypoints: ["src/subm.ts"],
    });
}

export {};

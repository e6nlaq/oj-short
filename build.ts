import { $ } from "bun";

if (process.platform === "win32") { 
  console.log("Please run this script in Linux or MacOS.");
  process.exit(1);
}

const targets: Bun.Build.CompileTarget[] = [
  "bun-linux-x64",
  "bun-linux-arm64",
  "bun-darwin-x64",
  "bun-darwin-arm64",
];

await $`rm -rf ./bin`;

async function createZip(target: string) {
  await $`zip -r ./bin/${target}.zip ./bin/out/* -j -9`;
  console.log(`Created ${target}.zip`);
}

for (const target of targets) {
  await Bun.build({
    compile: {
      target,
      outfile: `./bin/out/get`,
    },
    entrypoints: ["src/get.ts"],
    minify: true,
    bytecode: true,
  });
  await Bun.build({
    compile: {
      target,
      outfile: `./bin/out/subm`,
    },
    entrypoints: ["src/subm.ts"],
    minify: true,
    bytecode: true,
  });
  await createZip(target);
}

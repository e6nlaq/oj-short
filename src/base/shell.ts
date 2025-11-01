export const oj = (args: string[]) =>
    Bun.spawnSync(["oj", ...args], { stdout: "inherit", stderr: "inherit" });

export function system(command: string) {
    Bun.spawnSync([command], { stdout: "inherit", stderr: "inherit" });
}

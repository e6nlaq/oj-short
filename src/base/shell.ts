import { spawnSync } from "node:child_process";
import { info } from "../cli/log";

export const oj = (args: string[]) =>
    Bun.spawnSync(["oj", ...args], { stdout: "inherit", stderr: "inherit" });

export function system(cmd: string[]) {
    if (cmd.includes("&&")) {
        info("Run command with spawn.");
        spawnSync(cmd[0], cmd.slice(1), { stdio: "inherit", shell: true });
    } else {
        info("Run command with Bun.spawnSync.");
        Bun.spawnSync(cmd, { stdout: "inherit", stderr: "inherit" });
    }
}

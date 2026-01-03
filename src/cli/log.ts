import chalk from "chalk";

export function error(...message: unknown[]) {
    console.error(`${chalk.reset("[")}${chalk.red("ERROR")}]`, ...message);
}

export function info(...message: unknown[]) {
    console.log(`${chalk.reset("[")}${chalk.cyan("SHORT")}]`, ...message);
}

import chalk from "chalk";

export function error(message: string) {
    console.error(`${chalk.reset("[")}${chalk.red("ERROR")}] ${message}`);
}

export function info(message: string) {
    console.log(`[${chalk.cyan("SHORT")}] ${message}`);
}

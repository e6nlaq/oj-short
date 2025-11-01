import chalk from "chalk";

export function error(message: string) {
	console.log(`[${chalk.red("ERROR")}] ${message}`);
}

export function info(message: string) {
	console.log(`[${chalk.blue("INFO")}] ${message}`);
}

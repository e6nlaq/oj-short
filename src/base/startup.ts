import chalk from "chalk";
import updateNotifier from "update-notifier";
import packageJson from "../../package.json";
import { error, info } from "../cli/log.js";
import { init_config } from "./config.js";
import exist_oj from "./exist_oj.js";

export default function startup() {
    info(chalk.bold(`oj-short v${packageJson.version} / by e6nlaq`));

    if (typeof Bun === "undefined") {
        error("This tool only works on Bun");
        process.exit(1);
    }

    const notifier = updateNotifier({
        pkg: packageJson,
    });

    if (notifier.update) {
        info(
            `Update available. Run '${chalk.bold.underline(`bun update ${notifier.update.name} -g --latest`)}' to update. (${chalk.bold.red(notifier.update.current)} -> ${chalk.bold.greenBright(notifier.update.latest)})`,
        );
    }

    if (!exist_oj()) {
        error("oj is not installed on the device.");
        error(
            "See https://github.com/online-judge-tools/oj/blob/master/docs/INSTALL.md to install oj.",
        );
        process.exit(1);
    }

    info("oj is installed on the device");

    init_config();
}

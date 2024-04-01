import updateNotifier from 'update-notifier';
import packageJson from '../../package.json' assert { type: 'json' };

import exist_oj from './exist_oj.js';
import { error, info } from '../cli/log.js';
import { init_config } from './config.js';

export default function startup() {
    updateNotifier({ pkg: packageJson }).notify();

    if (!exist_oj()) {
        error('oj is not installed on the device.');
        info(
            'See https://github.com/online-judge-tools/oj/blob/master/docs/INSTALL.md'
        );
        process.exit(1);
    }

    info('oj is installed on the device');

    init_config();
}

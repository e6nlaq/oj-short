import { spawn } from 'child_process';

export const oj = (args: string[]) =>
    spawn('oj', args, { stdio: 'inherit', shell: true });

export function system(command: string) {
    const split = command.split(' ');
    spawn(split[0], split.slice(1), { stdio: 'inherit', shell: true });
}

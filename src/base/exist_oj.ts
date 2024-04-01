import which from 'which';

export default function exist_oj(): boolean {
    const path = which.sync('oj', { nothrow: true });

    return typeof path === 'string';
}

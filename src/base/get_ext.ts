export default function get_ext(filename: string): string {
    const file_arr = filename.split('.');
    return file_arr[file_arr.length - 1];
}

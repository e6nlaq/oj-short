import { parse } from "node:path";

export default function get_ext(filename: string): string {
    return parse(filename).ext;
}

export default function exist_oj(): boolean {
	const path = Bun.which("oj");

	return path !== null;
}

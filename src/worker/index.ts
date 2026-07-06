import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.all("/api/**", async (c) => {
	const backend = c.env.BACKEND_URL;
	if (!backend) {
		return c.json({ error: "BACKEND_URL is not configured" }, 500);
	}

	const url = new URL(c.req.url);
	const target = `${backend.replace(/\/$/, "")}${url.pathname}${url.search}`;

	const headers = new Headers(c.req.raw.headers);
	headers.delete("host");
	headers.delete("origin");
	headers.delete("referer");

	const method = c.req.method;
	const hasBody = !["GET", "HEAD"].includes(method);

	return fetch(target, {
		method,
		headers,
		body: hasBody ? c.req.raw.body : undefined,
	});
});

export default app;

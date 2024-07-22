import { Hono } from "hono";
import { db } from "../libs/kysely";
import { Bindings } from "../type";

export const user = new Hono<{ Bindings: Bindings }>();

user.get("/", async (c) => {
	const result = await db(c)
		// prettier
		.selectFrom("users")
		.selectAll()
		.execute();

	return c.json(result);
});

user.get("/:id", async (c) => {
	const result = await db(c)
		// prettier
		.selectFrom("users")
		.selectAll()
		.execute();

	return c.json(result);
});

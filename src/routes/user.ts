import { Hono } from "hono";
import { db } from "../libs/kysely";
import { Bindings } from "../type";

export const user = new Hono<{ Bindings: Bindings }>();

user.get("/", async (c) => {
	const result = await db(c).selectFrom("users").selectAll().execute();

	return c.text("Hello Hono!" + JSON.stringify(result));
});

user.get("/:id", async (c) => {
	const result = await db(c).selectFrom("users").selectAll().execute();

	return c.text("Hello Hono!" + JSON.stringify(result));
});

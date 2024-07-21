import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Hono } from "hono";
import { Database } from "./types";

type Bindings = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
	const connectionString = `${c.env.DATABASE_URL}`;

	const pool = new Pool({ connectionString });
	const dialect = new PostgresDialect({
		pool
	});

	const db = new Kysely<Database>({
		dialect,
		log: (event) => {
			if (event.level === "query") {
				console.log(event.query.sql);
				console.log(event.query.parameters);
			}
		}
	});

	const result = await db.selectFrom("users").selectAll().execute();

	return c.text("Hello Hono!" + JSON.stringify(result));
});

export default app;

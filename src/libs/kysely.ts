import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Context } from "hono";
import { BlankInput } from "hono/types";
import { Bindings } from "../type";
import { DB } from "../db/types";

export const db = (
	c: Context<
		{
			Bindings: Bindings;
		},
		"/",
		BlankInput
	>
) => {
	const connectionString = `${c.env.DATABASE_URL}`;

	const pool = new Pool({ connectionString });
	const dialect = new PostgresDialect({
		pool
	});

	return new Kysely<DB>({
		dialect,
		log: (event) => {
			if (event.level === "query" && c.env.DEVELOPMENT === "true") {
				console.log(event.query.sql);
				console.log(event.query.parameters);
			}
		}
	});
};

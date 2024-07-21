import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Hono } from "hono";

type Bindings = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
	const connectionString = `${c.env.DATABASE_URL}`;

	const pool = new Pool({ connectionString });
	const adapter = new PrismaPg(pool);
	const prisma = new PrismaClient({ adapter });

	const result = await prisma.user.findMany({
		select: {
			id: true
		}
	});

	return c.text("Hello Hono!" + JSON.stringify(result));
});

export default app;

import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
	const prisma = new PrismaClient();

	const result = await prisma.user.findMany({
		select: {
			id: true
		}
	});

	return c.text("Hello Hono!" + JSON.stringify(result));
});

export default app;

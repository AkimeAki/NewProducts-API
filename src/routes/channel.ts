import { Hono } from "hono";
import { db } from "../libs/kysely";
import { Bindings } from "../type";
import { safeString } from "../libs/safe-type";
import { getStatus, ValidationError } from "../libs/get-status";
import { StatusCode } from "hono/utils/http-status";

export const user = new Hono<{ Bindings: Bindings }>();

user.post("/", async (c) => {
	let status: StatusCode = 500;
	let data = {};

	try {
		const { userId, name } = await c.req.parseBody();
		const bodyUserId = safeString(userId);
		const bodyName = safeString(name);

		if (bodyName === null || bodyUserId === null) {
			throw new ValidationError();
		}

		await db(c)
			// prettier
			.transaction()
			.execute(async (db) => {
				const channel = await db
					// prettier
					.insertInto("channels")
					.values({
						name: bodyName
					})
					.returning(["id"])
					.executeTakeFirstOrThrow();

				await db
					// prettier
					.insertInto("channel_users")
					.values({
						channel_id: channel.id,
						user_id: bodyUserId
					})
					.execute();

				data = {
					id: channel.id,
					name: bodyName
				};

				status = 200;
			});
	} catch (e) {
		data = {};
		status = getStatus(e);
	}

	c.status(status);
	return c.json(data);
});

user.get("/", async (c) => {
	let status: StatusCode = 500;
	let data: {
		id: string;
		name: string;
	}[] = [];

	try {
		const { userId } = c.req.query();
		const bodyUserId = safeString(userId);

		if (bodyUserId === null) {
			throw new ValidationError();
		}

		const channels = await db(c)
			// prettier
			.selectFrom("channels")
			.selectAll()
			.leftJoin("channel_users", "channels.id", "channel_users.channel_id")
			.where("channel_users.user_id", "=", bodyUserId)
			.execute();

		channels.forEach((channel) => {
			data.push({
				id: channel.id,
				name: channel.name
			});
		});
	} catch (e) {
		data = [];
		status = getStatus(e);
	}

	c.status(status);
	return c.json(data);
});

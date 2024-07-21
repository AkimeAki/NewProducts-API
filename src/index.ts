import { Hono } from "hono";
import { user } from "./routes/user";
import { Bindings } from "./type";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
	return c.text("Hello Hono!");
});

app.route("/user", user);

export default app;

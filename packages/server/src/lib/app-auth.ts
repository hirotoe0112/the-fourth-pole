import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/auth.js";
import type { HonoContext } from "../types/hono-context.js";

const appAuth = new OpenAPIHono<{ Variables: HonoContext }>();
appAuth.use("*", authMiddleware());

export { appAuth };

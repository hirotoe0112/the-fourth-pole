import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware/auth.js";

const appAuth = new OpenAPIHono();
appAuth.use("*", authMiddleware());

export { appAuth };

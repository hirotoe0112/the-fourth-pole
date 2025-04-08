import { OpenAPIHono } from "@hono/zod-openapi";
import { getNoteById } from "./routes/get-note-by-id.js";

/**
 * Route definition of Note App
 */
const noteApp = new OpenAPIHono();
noteApp.route("/", getNoteById);

export { noteApp };

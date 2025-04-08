import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { noteApp } from "./apps/note/index.js";

const app = new OpenAPIHono({
  defaultHook: (result, c: Context) => {
    if (!result.success) {
      return c.json(
        {
          message: "Invalid request",
          details: result,
        },
        400,
      );
    }
  },
});

// Route Definitions
app.route("/note", noteApp);

// Show formatted json when adding ?pretty at the end of the url
app.use("*", prettyJSON());

// OpenAPI documentation
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "The Fourth Pole API",
  },
});
app.get(
  "/doc-ui",
  swaggerUI({
    url: "/doc",
    title: "The Fourth Pole API",
  }),
);

// Error handling
app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      message: "custom error handler",
    },
    500,
  );
});

// Start the server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { sampleApp } from "./apps/sample/index.js";
import { swaggerUI } from "@hono/swagger-ui";
import { prettyJSON } from "hono/pretty-json";
import type { Context } from "hono";
import { authMiddleware } from "./middleware/auth.js";

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

// Auth
app.use("*", authMiddleware());

app.openapi(sampleApp, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

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

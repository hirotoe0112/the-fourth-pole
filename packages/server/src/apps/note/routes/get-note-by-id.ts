import { createRoute, z } from "@hono/zod-openapi";
import { appAuth } from "../../../lib/app-auth.js";
import { getNoteByIdHandler } from "../handlers/get-note-by-id.js";

export const getNoteById = appAuth.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: z.object({
        id: z.string().openapi({
          param: {
            name: "id",
            in: "path",
          },
          description: "Note ID to retrieve",
          example: "01JQX3R8R0SPHKK1RTJGT37QZF",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              content: z.string(),
            }),
          },
        },
        description: "Note content",
        example: "Hello, Good morning, Goodbye.",
      },
    },
  }),
  async (c) => {
    const userId = c.var.userId;

    const data = await getNoteByIdHandler({
      userId: userId,
    });
    return c.json(data, 200);
  },
);

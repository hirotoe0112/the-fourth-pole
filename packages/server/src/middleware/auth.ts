import { config } from "dotenv";
import type { MiddlewareHandler } from "hono";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { HonoContext } from "../types/hono-context.js";
config();

const ISSUER = process.env.AUTH0_ISSUER;
const AUDIENCE = process.env.AUTH0_AUDIENCE;

/**
 * 認証用ミドルウェア
 */
export const authMiddleware = (): MiddlewareHandler<{
  Variables: HonoContext;
}> => {
  const jwks = createRemoteJWKSet(new URL(`${ISSUER}.well-known/jwks.json`));

  return async (c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json(
        { message: "Missing or invalid Authorization header" },
        401,
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const { payload } = await jwtVerify(token, jwks, {
        issuer: ISSUER,
        audience: AUDIENCE,
      });

      c.set("userId", payload.sub as string);

      await next();
    } catch (err) {
      console.error("JWT validation error:", err);
      return c.json({ message: "Unauthorized" }, 401);
    }
  };
};

import { createRoute } from '@hono/zod-openapi'
import { UserSchema } from './scheme.js'
import { ParamsSchema } from './scheme.js'

export const sampleApp = createRoute({
  method: 'get',
  path: '/users/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import prisma from '@/libs/prisma';

export const user = new Hono().post(
  '/',
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      name: z.string().max(10),
    }),
    (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          400
        );
      }
    }
  ),
  async (c) => {
    const { email, name } = c.req.valid('json');

    const createUserResponse = await (async () => {
      try {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
          },
        });

        return {
          status: 200,
          data: newUser,
        } as const;
      } catch (e) {
        return {
          status: 500,
          error: {
            message: e instanceof Error ? e.message : 'Internal Server Error',
          },
        } as const;
      }
    })();

    return c.jsonT(createUserResponse, createUserResponse.status);
  }
);

import prisma from '@/libs/prisma';
import { defineUserFactory } from '~/fabbrica';

describe('User', () => {
  describe('add user', () => {
    it('creates a new user with valid input', async () => {
      const userFactory = defineUserFactory();
      const user = await userFactory.create();

      expect(
        await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        })
      ).toStrictEqual(user);
    });

    it('throws an error if email is already in use', async () => {
      const userFactory = defineUserFactory({
        defaultData: {
          email: 'test@example.com',
        },
      });

      await userFactory.create();

      await expect(userFactory.create()).rejects.toMatchObject({
        name: 'PrismaClientKnownRequestError',
      });
    });
  });
});

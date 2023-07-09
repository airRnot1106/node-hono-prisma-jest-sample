import prisma from '@/libs/prisma';

describe('User', () => {
  describe('add user', () => {
    it('creates a new user with valid input', async () => {
      const email = 'test@example.com';
      const name = 'test';

      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      expect(
        await prisma.user.findUnique({
          where: {
            email,
          },
        })
      ).toStrictEqual(user);
    });

    it('throws an error if email is already in use', async () => {
      const email = 'test@example.com';
      const name = 'test';

      await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      await expect(
        prisma.user.create({
          data: {
            email,
            name: 'test2',
          },
        })
      ).rejects.toMatchObject({
        name: 'PrismaClientKnownRequestError',
      });
    });
  });
});

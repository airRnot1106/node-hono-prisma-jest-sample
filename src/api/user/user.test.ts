import { route } from '@/index';

describe('User API', () => {
  describe('POST /user', () => {
    it('should return 200 with valid data', async () => {
      const response = await route.request('http://localhost:3000/api/user', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'test',
        }),
      });

      expect(response.status).toBe(200);
    });

    it('should return 400 with invalid data', async () => {
      const response = await route.request('http://localhost:3000/api/user', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test',
          name: 'test',
        }),
      });

      expect(response.status).toBe(400);
    });
  });
});

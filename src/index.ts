import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { user } from '@/api/user/route';

const app = new Hono().basePath('/api');

export const route = app.route('/user', user);

if (process.env.NODE_ENV !== 'test') {
  serve(app);
}

const nodeFetch = require('node-fetch');
// Mocking fetch Web API using node-fetch
if (typeof fetch === 'undefined') {
  global.fetch = nodeFetch;
  global.Request = nodeFetch.Request;
  global.Response = nodeFetch.Response;
}

jest.mock('./src/libs/prisma', () => {
  return {
    __esModule: true,
    default: jestPrisma.client,
  };
});

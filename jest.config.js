module.exports = {
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: '@quramy/jest-prisma-node/environment',
  setupFilesAfterEnv: [
    '@quramy/prisma-fabbrica/scripts/jest-prisma',
    '<rootDir>/jest.setup.js',
  ],
};

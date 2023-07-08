module.exports = {
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: '@quramy/jest-prisma/environment',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

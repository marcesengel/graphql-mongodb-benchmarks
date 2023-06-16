/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: process.env.CI
    ? [['github-actions', { silent: false }], 'summary']
    : ['default'],
  projects: ['<rootDir>/typescript-fastify-graphql-http'],
}

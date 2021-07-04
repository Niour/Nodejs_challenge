/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // The root directory that Jest should scan for tests and modules within
  rootDir: "./tests",
  // The test environment that will be used for testing
  testEnvironment: "node",
  // The beforeAll and afterAll functions
  setupFilesAfterEnv: ["./login.test.ts"],
  modulePathIgnorePatterns: ["./login.test.ts"],
};

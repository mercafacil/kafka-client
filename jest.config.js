process.env = Object.assign(process.env, {
    TZ: 'GMT'
  })
  
  module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    globalSetup: './test/utils/globalSetup.ts',
    globalTeardown: './test/utils/globalTeardown.ts',
    setupFilesAfterEnv: ['./test/utils/setupTests.ts'],
    roots: ['<rootDir>/test'],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }
  
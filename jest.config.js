module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  globalSetup: './test/settings/settings.js',
  testEnvironment: 'node',
};

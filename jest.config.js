/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  modulePaths: ['utility_modules'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],

  transform: {
    // Support Vue SFC
    '^.+\\.vue$': require.resolve('@vue/vue3-jest'),
    // Use babel for ES modules support in Jest and JSX
    '^.+\\.[jt]sx?$': require.resolve('babel-jest'),
    // Ignore assets
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
  },
  // Dependencies are usually in CommonJS modules
  transformIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    // Support the same @ -> src alias mapping in source code
    '^@/(.*)$': '<rootDir>/src/$1',
    // Use commonjs version of lodash in tests (migration from previous @vue/cli taskbook...)
    '^lodash-es$': 'lodash',
  },

  testEnvironment: 'jsdom',

  // Serializer for Vue snapshots
  snapshotSerializers: ['jest-serializer-vue'],

  // Add taskbook utilities
  setupFilesAfterEnv: ['<rootDir>/utility_modules/taskbook-jest-setup.js'],

  testMatch: ['**/[0-9][0-9]*/[0-9][0-9]*/**/__tests__/**/*.(spec|test|student-test).[jt]s?(x)'],

  testEnvironmentOptions: {
    url: 'https://localhost',
    customExportConditions: ['node', 'node-addons'],
  },

  watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')],

  clearMocks: true,
};

// Legacy config for Taskbook Monitor Generator
if (process.env.TASK_MONITOR) {
  Object.assign(config, {
    testResultsProcessor: '<rootDir>/utility_modules/taskbook-test-results-processor.js',
    reporters: [],
  });
}

module.exports = config;

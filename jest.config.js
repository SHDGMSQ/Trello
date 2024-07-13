module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['[**/__tests__/**](https://www.bing.com/search?form=SKPBOT&q=%2F__tests__%2F)/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
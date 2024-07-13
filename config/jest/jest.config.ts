import type {Config} from "jest";

const config: Config = {
  roots: ["<rootDir>/../../src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../../src/$1",
    "^tests/(.*)$": "<rootDir>/../../src/tests/$1",
  },
  testMatch: ["**/?(*.)(spec|test).[jt]s?(x)"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
};
export default config;

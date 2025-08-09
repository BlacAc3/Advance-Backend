module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/db/services/__tests__/**/*.test.ts"],
  testTimeout: 10000,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // No setupFilesAfterEnv for unit tests - they don't need database setup
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/db/services/**/*.{ts,tsx}",
    "!src/db/services/**/*.test.ts",
    "!src/db/services/__tests__/**",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};

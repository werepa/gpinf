module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  // testRegex: "./src/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    "^.+\\.ts?$": [
      "@swc/jest"
    ]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/_core/$1',
  },
};

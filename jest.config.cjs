module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'cjs'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|cjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$': '<rootDir>/__mocks__/fileMock.js',
    '^vite$': '<rootDir>/__mocks__/vite.js',
  },
  setupFilesAfterEnv: ['./setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx', '.tsx'],
  
};

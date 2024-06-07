module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'cjs'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|cjs)$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest', // Añade esta línea para manejar archivos .jsx con Babel
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignora los archivos en node_modules por defecto
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$': '<rootDir>/__mocks__/fileMock.js',
    '^vite$': '<rootDir>/__mocks__/vite.js',
  },
  setupFiles: ['./test-setup.js'],
  setupFilesAfterEnv: ['./setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx', '.tsx'],
};

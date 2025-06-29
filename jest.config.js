module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts',  // ya existente
    '**/test/**/*.test.ts'        // añade esta línea
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};

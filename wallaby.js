module.exports = wallaby => {
  return {
    files: ['src/**/*.js', '!src/**/*.spec.js'],
    tests: ['src/**/*.spec.js'],
    env: {
      type: 'node',
    },
    testFramework: 'jest',
    compilers: {
      'src/**/*.js': wallaby.compilers.babel(),
    },
  }
}

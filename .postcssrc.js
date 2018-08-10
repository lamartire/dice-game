const theme = require('./src/theme')

module.exports = {
  plugins: {
    'postcss-partial-import': {},
    'postcss-custom-properties': {
      variables: theme,
      preserve: false,
    },
    'postcss-nested': {},
    autoprefixer: ['last 2 versions', '> 5%'],
  },
}

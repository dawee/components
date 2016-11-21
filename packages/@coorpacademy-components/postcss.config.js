module.exports = () => ({
  plugins: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    stylelint: {},
    'postcss-reporter': {clearMessages: true, throwError: true}
  }
});

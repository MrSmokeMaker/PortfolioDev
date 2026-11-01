module.exports = {
  plugins: [
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./*.html', './assets/js/**/*.js'],
      defaultExtractor: content => content.match(/[^<>{}\s]+/g) || []
    })
  ]
};
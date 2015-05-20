gulp = require('gulp')
path = require('path')
mocha = require('gulp-mocha')
babel = require('gulp-babel')
eslint = require('gulp-eslint')


gulp.task 'lint', ->
  gulp.src([
    './src/**/*.js'
  ])
    .pipe eslint(
      "configFile": path.join(__dirname, ".eslintrc")
    )
    .pipe eslint.format()
    .pipe eslint.failOnError()


gulp.task 'build', ['lint'], ->
  gulp.src('./src/**/*.js')
    .pipe(babel(
      blacklist: [ 'regenerator' ]
    ))
    .pipe gulp.dest('./build')



gulp.task 'tests', [ 'build' ], ->
  gulp.src('./test/**/*.test.js', read: false)
    .pipe mocha(
      ui: 'exports'
      reporter: 'spec'
    )



gulp.task 'default', ['tests']


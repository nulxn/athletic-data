const gulp = require("gulp");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const replace = require("gulp-replace");

const paths = {
  scripts: {
    src: [
      "src/colors.js",
      "src/functions.js",
      "src/main.js",
      "src/deps/js/**/*.js",
    ],
    dest: "dist/js/",
  },
  styles: {
    src: ["src/style.css", "src/deps/css/**/*.css"],
    dest: "dist/css/",
  },
  pages: {
    src: "src/index.html",
    settingsSrc: "src/settings/index.html",
    dest: "dist/",
    settingsDest: "dist/settings/",
  },
  fonts: {
    src: "src/FiraCode-VariableFont_wght.ttf",
    dest: "dist/fonts/",
  },
};

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(
      replace(
        "url(FiraCode-VariableFont_wght.ttf)",
        "url(../fonts/FiraCode-VariableFont_wght.ttf)"
      )
    )
    .pipe(gulp.dest(paths.styles.dest));
}

function pages() {
  return gulp
    .src(paths.pages.src)
    .pipe(replace('src="colors.js"', 'src="js/colors.js"'))
    .pipe(replace('src="functions.js"', 'src="js/functions.js"'))
    .pipe(replace('href="style.css"', 'href="css/style.css"'))
    .pipe(
      replace(
        'href="deps/css/tabulator.min.css"',
        'href="css/tabulator.min.css"'
      )
    )
    .pipe(replace('src="deps/js/axios.min.js.js"', 'src="js/axios.min.js.js"'))
    .pipe(
      replace('src="deps/js/tabulator.min.js"', 'src="js/tabulator.min.js"')
    )
    .pipe(replace('src="main.js"', 'src="js/main.js"'))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.pages.dest))
    .pipe(gulp.src(paths.pages.settingsSrc))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.pages.settingsDest));
}

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch([paths.pages.src, paths.pages.settingsSrc], pages);
}

const build = gulp.series(gulp.parallel(scripts, styles, pages, fonts));
const watch = gulp.series(build, watchFiles);

exports.scripts = scripts;
exports.styles = styles;
exports.pages = pages;
exports.fonts = fonts;
exports.watch = watch;
exports.default = build;

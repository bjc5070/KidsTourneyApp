const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const del = require("del");
const runSequence = require("run-sequence");
const debug = require("gulp-debug");
const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

// Development Tasks
// -----------------

const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync("db.json");
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id
    app.get("/posts/:id", (req, res) => {
      const post = db
        .get("posts")
        .find({ id: req.params.id })
        .value();

      res.send(post);
    });
    // POST /posts
    app.post("/posts", (req, res) => {
      db
        .get("posts")
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post => res.send(post));
    });

    // Set db default values
    return db.defaults({ contestants: [] }).write();
  })
  .then(() => {
    app.listen(3002, () => console.log("listening on port 3002"));
  });

// Start browserSync server
gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task("sass", function() {
  return gulp
    .src("app/scss/**/*.scss") // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest("app/css")) // Outputs it in the css folder
    .pipe(
      browserSync.reload({
        // Reloading with Browser Sync
        stream: true
      })
    );
});

// Watchers
gulp.task("watch", function() {
  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/js/**/*.js", browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task("useref", function() {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

// Cleaning
gulp.task("clean", function() {
  return del.sync("dist").then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task("clean:dist", function() {
  return del.sync(["dist/**/*", "!dist/images", "!dist/images/**/*"]);
});

// Build Sequences
// ---------------

gulp.task("default", function(callback) {
  runSequence(["sass", "browserSync"], "watch", callback);
});

gulp.task("build", function(callback) {
  runSequence("clean:dist", "sass", ["useref"], callback);
});

"use strict";

const del = require("delete");
const log = require("fancy-log");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const alias = require("gulp-ts-alias");
const sourcemaps = require("gulp-sourcemaps");
const { spawn } = require("child_process");
const path = require("path");
const project = typescript.createProject("tsconfig.json");

// Node process
let node = null;
// Executes a node script with params
// @params: string[] -> The params you would pass to the node command
function execute(params) {
  if (node) node.kill();
  node = spawn("node", params, {
    stdio: "inherit",
  });
  node.on("close", function (code) {
    if (code === 8) {
      log.error("Error detected, waiting for changes...");
    }
  });
  return Promise.resolve();
}

// Deletes the dist folder for a clean compilation
async function clean() {
  await del("dist");
}

// Compiles Typescript and creates the dist folder
function compile() {
  const compiled = gulp.src(["src/**/*.{ts,js}"]).pipe(alias("tsconfig.json")).pipe(sourcemaps.init()).pipe(project());

  return compiled.js
    .pipe(sourcemaps.write(".", { sourceRoot: (file) => path.relative(path.join(file.cwd, file.path), file.base) }))
    .pipe(gulp.dest("dist/"));
}

// Execute the Node process
function serve() {
  return execute(["--require", "source-map-support/register", "dist/app.js"]);
}

// First time cleans and compiles, subsequent times only compiles
function watch() {
  return gulp.watch("src/**/*.ts", gulp.series(compile, serve));
}

const build = gulp.series(clean, compile);
const start = gulp.series(clean, compile, serve, watch);

module.exports = {
  start,
  build
}

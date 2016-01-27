'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var packager = require("electron-packager");
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;

// Clean Output Directory
gulp.task('clean', function(cb) {
    del(['build', 'release'], function() {
        fs.mkdir("./release", cb);
    });
});

// Build Production Files, the Default Task
gulp.task('default', ['build'], function () {
});

gulp.task('copyBuild', function() {
    var build = gulp.src([ 'main.js', 'app/**/*', '!app/**/*.ts', 'node_modules/**/*', 'server/**/*.js', 'init/**/*.js', 'package.json'], {base: './src', cwd: './src'});
    return build.pipe(gulp.dest('build'));
});

gulp.task('buildElectron', function(cb) {
    var packageJson = require("./build/package.json");
    packageJson.name = "KeySAVe";
    packager({
        arch: process.arch,
        dir: "./build",
        platform: process.platform,
        "app-bundle-id": "com.cu3po42.keysave",
        "app-category-type": "public.app-category.productivity",
        "app-version": packageJson.version,
        asar: false,
        "build-version": packageJson.version,
        cache: "./cache",
        "helper-bundle-id": "com.cu3po42.keysave",
        icon: "./resources/keysave-logo",
        name: packageJson.name,
        out: "./release",
        overwrite: true,
        version: "0.36.3",
        "version-string": {
            CompanyName: "Cu3PO42",
            LegalCopyright: "Cu3PO42",
            FileDescription: "The best KeySAV ever.",
            OriginalFilename: "KeySAVe.exe",
            ProductName: "KeySAVe",
            InternalName: "KeySAVe"
        }
    }, cb);
});

gulp.task('packageElectron', ['buildElectron'], process.platform === "darwin" ? function(cb) {
    spawn("ditto", ["-ck", "--sequesterRsrc", "--keepParent",
                    "--zlibCompressionLevel", "9",
                    "../KeySAVe-" + require("./build/package.json").version + "-darwin-x64.zip", "KeySAVe.app"
                   ], { cwd: "./release/KeySAVe-darwin-x64", stdio: "ignore" }, cb);
} : function() {
       return gulp.src("@(**/*|LICENSE|LICENSES.chromium.html|version)", { cwd: "release/KeySAVe-" + process.platform + "-" + process.arch +"/" })
                  .pipe($.zip("KeySAVe-" + require("./build/package.json").version + process.platform + "-" + process.arch + ".zip"))
                  .pipe(gulp.dest("release"));
});

gulp.task('packageUpdate', function(cb) {
    return gulp.src("build/**/*")
    .pipe($.zip("KeySAVe-" + require("./build/package.json").version + "-update-" + process.platform + "-" + process.arch + ".zip"))
    .pipe(gulp.dest("release"));
});

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        'copyBuild',
        ['packageElectron', 'packageUpdate'],
        cb);
});

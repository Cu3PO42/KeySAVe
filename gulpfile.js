'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');

// Clean Output Directory
gulp.task('clean', del.bind(null, ['build', 'release']));

// Build Production Files, the Default Task
gulp.task('default', ['build'], function () {
});

gulp.task('copyBuild', function() {
    var build = gulp.src([ 'main.js', 'app/**/*', '!app/**/*.ts', 'node_modules/**/*', 'server/**/*.js', 'package.json'], {base: './src', cwd: './src'});
    return build.pipe(gulp.dest('build'));
});


gulp.task('buildElectron', function() {
    var packageJson = require("./build/package.json");
    packageJson.name = "KeySAVe";
    return gulp.src("")
    .pipe($.electron({
        src: "./build",
        packageJson: packageJson,
        release: "./release",
        cache: "./cache",
        version: "v0.30.1",
        platforms: ["darwin-x64", "win32-ia32", "linux-ia32", "linux-x64"],
        platformResources: {
            darwin: {
                CFBundleDisplayName: "KeySAVe",
                CFBundleIdentifier: "com.cu3po42.keysave",
                CFBundleName: "KeySAVe",
                CFBundleVersion: packageJson.version,
                icon: "resources/keysave-logo.icns"
            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version,
                "icon": "resources/keysave-logo.ico"
            }
        }
    }))
    .pipe(gulp.dest(""))
});

gulp.task('buildUpdate', function() {
    return gulp.src("build/**/*")
    .pipe($.zip("KeySAVe-" + require("./package.json").version + "-update-any.zip"))
    .pipe(gulp.dest("release"));
});

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        'copyBuild',
        ['buildElectron', 'buildUpdate'],
        cb);
});

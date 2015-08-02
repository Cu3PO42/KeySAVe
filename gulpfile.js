/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

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
    // TODO get production dependencies here
    var build = gulp.src(['app/**/*', '!app/**/*.ts', 'names/**/*', 'node_modules/{keysavcore,handlebars,lodash,electron-ipc-tunnel,electron-gh-releases-updater,async,path-extra}/**/*', 'server/**/*.js', 'package.json'], {base: '.'});
    var mainJs = gulp.src('main.js')
    var bowerComponents = gulp.src('bower_components/**/*').pipe(gulp.dest('build/app/bower_components'));
    //.pipe($.replace("app/index.html", "dist/index.html"))
    return merge(merge(build, mainJs).pipe(gulp.dest('build')), bowerComponents);
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

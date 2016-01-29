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
    }, function() {
        del(["version", "LICENSE", "LICENSES.chromium.html"], { cwd: "release/KeySAVe-" + process.platform + "-" + process.arch }, cb);
    });
});

gulp.task('packageElectron', ['buildElectron'], process.platform === "darwin" ? function(cb) {
    spawn("ditto", ["-ck", "--sequesterRsrc", "--keepParent",
                    "--zlibCompressionLevel", "9", "KeySAVe.app",
                    "../KeySAVe-" + require("./build/package.json").version + "-darwin-x64.zip"
                ], { cwd: "./release/KeySAVe-darwin-x64", stdio: "ignore" }).on("close", cb);
} : process.platform === "linux" ? function(cb) {
    spawn("zip", ["-9yr", "../KeySAVe-" + require("./build/package.json").version + "-linux-" + process.arch + ".zip", "."],
                 { cwd: "./release/KeySAVe-linux-" + require("./build/package.json").version, stdio: "ignore" }).on("close", cb);
} : function(cb) {
    spawn("powershell.exe", ["[Reflection.Assembly]::LoadWithPartialName(\"System.IO.Compression.FileSystem\"); " +
                             "[System.IO.Compression.ZipFile]::CreateFromDirectory(" +
                                  "\"release\\KeySAVe-win32-" + process.arch + "\", " + 
                                  "\"release\\KeySAVe-" + require("./build/package.json").version + "-win32-" + process.arch + ".zip\", " +
                                  "[System.IO.CompressionLevel]::Optimal, $FALSE"],
                            { stdio: "ignore" }).on("close", cb);
});

gulp.task('packageUpdate', process.platform === "darwin" ? function(cb) {
    spawn("ditto", ["-ck", "--sequesterRsrc", "--keepParent",
                    "--zlibCompressionLevel", "9", ".",
                    "../release/KeySAVe-" + require("./build/package.json").version + "-update-darwin-x64.zip"
                ], { cwd: "./build", stdio: "ignore" }).on("close", cb);
} : process.platform === "linux" ? function(cb) {
    spawn("zip", ["-9yr", "../release/KeySAVe-" + require("./build/package.json").version + "-update-linux-" + process.arch + ".zip", "."],
                 { cwd: "./build", stdio: "ignore" }).on("close", cb);
} : function(cb) {
    spawn("powershell.exe", ["[Reflection.Assembly]::LoadWithPartialName(\"System.IO.Compression.FileSystem\"); " +
                             "[System.IO.Compression.ZipFile]::CreateFromDirectory(" +
                                  "\"build\", " + 
                                  "\"release\\KeySAVe-" + require("./build/package.json").version + "-update-win32-" + process.arch + ".zip\", " +
                                  "[System.IO.CompressionLevel]::Optimal, $FALSE"],
                            { stdio: "ignore" }).on("close", cb);
});

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        'copyBuild',
        ['packageElectron', 'packageUpdate'],
        cb);
});

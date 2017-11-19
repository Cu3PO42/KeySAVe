/* eslint strict: 0, no-shadow: 0, no-unused-vars: 0, no-console: 0 */
'use strict';

const os = require('os');
const webpack = require('webpack');
const cfg = require('./webpack.config.production.js');
const packager = require('electron-packager');
const del = require('del');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');
const fs = require('fs');
const devDeps = Object.keys(pkg.devDependencies);

const appName = argv.name || argv.n || pkg.productName;
const shouldBuildAll = argv.all || false;


const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: false,
  prune: true,
  packageManager: 'yarn',
  'app-bundle-id': 'com.cu3po42.keysave',
  'app-category-type': 'public.app-category.productivity',
  'app-version': pkg.version,
  'build-version': pkg.version,
  'helper-bundle-id': 'com.cu3po42.keysave',
  icon: './resources/keysave-logo',
  overwrite: true,
  'version-string': {
    CompanyName: 'Cu3PO42',
    LegalCopyright: 'Cu3PO42',
    FileDescription: 'KeySAVe',
    OriginalFilename: 'KeySAVe.exe',
    ProductName: 'KeySAVe',
    InternalName: 'KeySAVe'
  },
  download: {
    cache: './cache'
  },
  ignore: [
    '^/(?:app/)?resources($|/)',
    '^/release($|/)',
    '^/cache($|/)',
    '^/serversrc($|/)',
    '^/app/(?!app\\.html)(?!$)',
    '/\\.idea($|/)',
    '^/react-devtools($|/)',
    '/webpack\\.config\\..+\\.js$',
    '^/nativedeps($|/)',
    '^/dist/.+\\.map$',
    '\\.babelrc$',
    '\\.DS_Store$',
    '\\.eslintrc$',
    '\\.gitignore$',
    '\\.travis\\.yml$',
    'appveyor\\.yml$',
    'gulpfile\\.js$',
    '^/package\\.js$',
    'README.md$'
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

if (!DEFAULT_OPTS.version) {
  DEFAULT_OPTS.version = pkg.devDependencies.electron.replace(/[\^\~]/g, '');
}
buildServer(startPack);

const zipElectron = process.platform === 'darwin' ? function zipElectronDarwin(cb) {
  spawn('ditto', ['-ck', '--sequesterRsrc', '--keepParent',
                    '--zlibCompressionLevel', '9', 'KeySAVe.app',
                    `../KeySAVe-${pkg.version}-darwin-x64.zip`
                ], { cwd: './release/KeySAVe-darwin-x64', stdio: 'ignore' }).on('close', cb);
} : process.platform === 'linux' ? function zipElectronLinux(cb) {
  exec(`zip -9yrq ../KeySAVe-${pkg.version}-linux-${process.arch}.zip .`,
         { cwd: `./release/KeySAVe-linux-${process.arch}` }, cb);
} : function zipElectronWindows(cb) {
  spawn('powershell.exe', ['[Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem"); ' +
                             '[System.IO.Compression.ZipFile]::CreateFromDirectory(' +
                                  `"release\\KeySAVe-win32-${process.arch}", ` +
                                  `"release\\KeySAVe-${pkg.version}-win32-${process.arch}.zip", ` +
                                  '[System.IO.Compression.CompressionLevel]::Optimal, $FALSE)'],
                            { stdio: 'ignore' }).on('close', cb);
};

const zipUpdate = process.platform === 'darwin' ? function zipUpdateDarwin(cb) {
  spawn('ditto', ['-ck', '--sequesterRsrc',
                  '--zlibCompressionLevel', '9', 'app.asar',
                  `../../../../KeySAVe-${pkg.version}-update-darwin-x64.zip`
                 ], { cwd: './release/KeySAVe-darwin-x64/KeySAVe.app/Contents/Resources/', stdio: 'inherit' }).on('close', cb);
} : process.platform === 'linux' ? function zipUpdateLinux(cb) {
  exec(`zip -9yrq ../../KeySAVe-${pkg.version}-update-linux-${process.arch}.zip app.asar`,
       { cwd: `./release/KeySAVe-linux-${process.arch}/resources/` }, cb);
} : function zipUpdateWindows(cb) {
  spawn('powershell.exe', ['[Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem"); ' +
                           `$zipfile = [System.IO.Compression.ZipFile]::Open("release\\KeySAVe-${pkg.version}-update-win32-${process.arch}.zip", "Update"); ` +
                           '[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(' +
                               '$zipfile, ' +
                               `"release\\KeySAVe-win32-${process.arch}\\resources\\app.asar", ` +
                               '"app.asar", ' +
                               '[System.IO.Compression.CompressionLevel]::Optimal); ' +
                           '$zipfile.Dispose();'],
                           { stdio: 'ignore' }).on('close', cb);
};

function buildServer(callback) {
  console.log('Building server files...');
  exec('npm run build-server', (err) => {
    if (err) {
      console.log('Error building server.');
      callback(err);
      return;
    }

    callback(null);
  });
}

function startPack() {
  console.log('start pack...');
  webpack(cfg, (err, stats) => {
    if (err) console.error(err);
    del('release')
    .then(paths => {
      // build for current platform only
      pack(os.platform(), os.arch(), log(os.platform(), os.arch()));
    })
    .catch(err => {
      console.error(err);
    });
  });
}

function pack(plat, arch, cb) {
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return;

  const opts = Object.assign({}, DEFAULT_OPTS, {
    platform: plat,
    arch,
    prune: true,
    out: 'release/'
  });

  packager(opts, (err) => {
    if (err) {
      cb(err);
      return;
    }
    del(['version', 'LICENSE', 'LICENSES.chromium.html'], { cwd: `release/KeySAVe-${process.platform}-${process.arch}` }).then(() => {
      console.log('Packaging your Electron app now.');
      zipElectron((err) => {
        if (err) {
          cb(err);
          return;
        }
        //console.log('Packaging update file.');
        //zipUpdate(cb);
      });
    }).catch(cb);
  });
}


function log(plat, arch) {
  return (err, filepath) => {
    if (err) console.error(err);
    console.log(`${plat}-${arch} finished!`);
  };
}

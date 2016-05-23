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
const shouldUseAsar = argv.asar || argv.a || false;
const shouldBuildAll = argv.all || false;


const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
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
    '^/app/(?!app\.html)(?!$)',
    '/.idea($|/)',
    '/webpack\.config\..+\.js$',
    '^/nativedeps($|/)',
    '^/dist/.+\.map$',
    '\.babelrc$',
    '\.DS_Store$',
    '\.eslintrc$',
    '\.gitignore$',
    '\.travis\.yml$',
    'appveyor\.yml$',
    'gulpfile\.js$',
    '^/package\.js$',
    'README.md$'
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

if (DEFAULT_OPTS.version) {
  startPack();
} else {
  // use the same version as the currently-installed electron-prebuilt
  exec('npm list electron-prebuilt', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '1.1.1';
    } else {
      DEFAULT_OPTS.version = stdout.split('electron-prebuilt@')[1].replace(/\s/g, '');
    }

    startPack();
  });
}

const zipElectron = process.platform === 'darwin' ? function zipElectronDarwin(cb) {
  spawn('ditto', ['-ck', '--sequesterRsrc', '--keepParent',
                    '--zlibCompressionLevel', '9', 'KeySAVe.app',
                    '../KeySAVe-' + pkg.version + '-darwin-x64.zip'
                ], { cwd: './release/KeySAVe-darwin-x64', stdio: 'ignore' }).on('close', cb);
} : process.platform === 'linux' ? function zipElectronLinux(cb) {
  exec('zip -9yrq ../KeySAVe-' + pkg.version + '-linux-' + process.arch + '.zip .',
         { cwd: './release/KeySAVe-linux-' + process.arch }, cb);
} : function zipElectronWindows(cb) {
  spawn('powershell.exe', ['[Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem"); ' +
                             '[System.IO.Compression.ZipFile]::CreateFromDirectory(' +
                                  '"release\\KeySAVe-win32-' + process.arch + '", ' +
                                  '"release\\KeySAVe-' + pkg.version + '-win32-' + process.arch + '.zip", ' +
                                  '[System.IO.Compression.CompressionLevel]::Optimal, $FALSE)'],
                            { stdio: 'ignore' }).on('close', cb);
};

const zipUpdate = process.platform === 'darwin' ? function zipUpdateDarwin(cb) {
  spawn('ditto', ['-ck', '--sequesterRsrc',
                  '--zlibCompressionLevel', '9', '.',
                  '../../../../../KeySAVe-' + pkg.version + '-update-darwin-x64.zip'
                 ], { cwd: './release/KeySAVe-darwin-x64/KeySAVe.app/Contents/Resources/app', stdio: 'inherit' }).on('close', cb);
} : process.platform === 'linux' ? function zipUpdateLinux(cb) {
  exec('zip -9yrq ../../../KeySAVe-' + pkg.version + '-update-linux-' + process.arch + '.zip .',
       { cwd: './release/KeySAVe-linux-' + process.arch + '/resources/app/' }, cb);
} : function zipUpdateWindows(cb) {
  spawn('powershell.exe', ['[Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem"); ' +
                           '[System.IO.Compression.ZipFile]::CreateFromDirectory(' +
                           '"release\\KeySAVe-win32-' + process.arch + '\\resources\\app", ' +
                           '"release\\KeySAVe-' + pkg.version + '-update-win32-' + process.arch + '.zip", ' +
                           '[System.IO.Compression.CompressionLevel]::Optimal, $FALSE)'],
                           { stdio: 'ignore' }).on('close', cb);
};

function pruneNodeModules(callback) {
  let appPath;
  if (process.platform === 'darwin') {
    appPath = `${__dirname}/release/KeySAVe-darwin-x64/KeySAVe.app/Contents/Resources/app`;
  } else {
    appPath = `${__dirname}/release/KeySAVe-${process.platform}-${process.arch}/resources/app`;
  }
  const pkgPath = `${appPath}/package.json`;
  fs.readFile(pkgPath, 'utf-8', (err, res) => {
    if (err) {
      callback(err);
      return;
    }

    let pkg;
    try {
      pkg = JSON.parse(res);
    } catch (e) {
      callback(e);
      return;
    }

    const newDeps = {};
    for (const dep of pkg.serverOnlyDependencies || []) {
      newDeps[dep] = pkg.dependencies[dep];
    }
    pkg.dependencies = newDeps;

    fs.writeFile(pkgPath, JSON.stringify(pkg), 'utf-8', (err) => {
      if (err) {
        callback(err);
        return;
      }

      exec('npm prune --production', { cwd: appPath }, (err) => {
        if (err) {
          callback(err);
          return;
        }

        fs.writeFile(pkgPath, res, 'utf-8', callback);
      });
    });
  });
}

function startPack() {
  console.log('start pack...');
  webpack(cfg, (err, stats) => {
    if (err) return console.error(err);
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
    out: `release/`
  });

  packager(opts, (err) => {
    if (err) {
      cb(err);
      return;
    }
    del(['version', 'LICENSE', 'LICENSES.chromium.html'], { cwd: 'release/KeySAVe-' + process.platform + '-' + process.arch }).then(() => {
      console.log('Packaging your Electron app now.');
      pruneNodeModules((err) => {
        zipElectron((err) => {
          if (err) {
            cb(err);
            return;
          }
          console.log('Packaging update file.');
          zipUpdate(cb);
        });
      });
    }).catch(cb);
  });
}


function log(plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err);
    console.log(`${plat}-${arch} finished!`);
  };
}

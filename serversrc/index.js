import { app, BrowserWindow, Menu, shell } from 'electron';
import '../init/promisify-fs';
import fileDialogServices from './server/file-dialog-service';
import dumper, { mergeKeyFolder } from './server/dumper';
import updater from './server/updater';
import './server/import-keysav2';
import * as fs from 'fs-extra';
import logger from './logger';
import { version } from '../package.json';

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  app.quit();
});

(async () => {
  const oldPath = app.getPath('documents') + '/KeySAVe/data';
  if (await fs.existsAsync(oldPath)) {
    logger.info(`Found an old key folder at ${oldPath}, merging now...`);
    await mergeKeyFolder(oldPath);
    await fs.removeAsync(oldPath);
    logger.info('Merged and deleted old key folder!')
  }
})();

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728,
     show: true, autoHideMenuBar: true
  });
  mainWindow.setMenuBarVisibility(false);

  logger.info(`KeySAVe - Version ${version} started`);
  logger.info(`OS: ${process.platform}-${process.arch}`);

  if (process.env.HOT) {
    mainWindow.loadURL(`file://${__dirname}/../app/hot-dev-app.html`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/../app/app.html`);
  }

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension('./react-devtools');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  fileDialogServices(mainWindow);
  dumper();
  updater();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'KeySAVe',
      submenu: [{
        label: 'About KeySAVe',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Hide KeySAVe',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'File',
      submenu: [{
        label: 'Open',
        accelerator: 'Command+O',
        click() {
          mainWindow.webContents.send('trigger-open-file');
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Documentation',
        click() {
          shell.openExternal('https://cu3po42.gitbooks.io/keysave/content/');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/Cu3PO42/KeySAVe/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O',
        click() {
          mainWindow.webContents.send('trigger-open-file');
        }
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Documentation',
        click() {
          shell.openExternal('https://cu3po42.gitbooks.io/keysave/content/');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/Cu3PO42/KeySAVe/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});

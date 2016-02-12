'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.call(thisArg, _arguments)).next());
    });
};
var electron_1 = require("electron");
var file_dialog_service_1 = require("./server/file-dialog-service");
var dumper_1 = require("./server/dumper");
var updater_1 = require("./server/updater");
var fs = require("fs-extra");
var child_process_1 = require("child_process");
require("./init/promisify-fs");
let menu;
let template;
let mainWindow = null;
if (process.env.NODE_ENV === 'development') {
    require('electron-debug')();
}
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
var keyPath = electron_1.app.getPath("userData") + "/keys";
if (!fs.existsSync(keyPath)) {
    (function () {
        return __awaiter(this, void 0, Promise, function* () {
            yield fs.mkdirpAsync(electron_1.app.getPath("userData"));
            try {
                yield fs.moveAsync(electron_1.app.getPath("home") + "/Documents/KeySAVe/config.json", electron_1.app.getPath("userData") + "/config.json", { clobber: false });
            }
            catch (e) { }
            try {
                yield fs.moveAsync(electron_1.app.getPath("home") + "/Documents/KeySAVe/data", keyPath, { clobber: false });
            }
            catch (e) {
                yield fs.mkdirpAsync(keyPath);
            }
            var searcher = child_process_1.fork(__dirname + "/workers/search-keysav.js");
            searcher.send({ path: electron_1.app.getPath("home"), depth: 5 });
            searcher.on("message", function (path) {
                return __awaiter(this, void 0, Promise, function* () {
                    try {
                        yield fs.readdirAsync(path + "/data").map((file) => __awaiter(this, void 0, Promise, function* () {
                            try {
                                var stats = yield fs.statAsync(path + "/data/" + file);
                                if (stats.isFile() && !(yield fs.existsAsync(keyPath + file))
                                    && (stats.size === 0xB4AD4 || stats.size === 0x1000)) {
                                    yield fs.copyAsync(path + "/data/" + file, keyPath + "/" + file);
                                }
                            }
                            catch (e) { }
                        }));
                    }
                    catch (e) { }
                });
            });
        });
    })();
}
electron_1.app.on('ready', () => {
    mainWindow = new electron_1.BrowserWindow({ width: 1024, height: 728 });
    if (process.env.HOT) {
        mainWindow.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
    }
    else {
        mainWindow.loadURL(`file://${__dirname}/app/app.html`);
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    file_dialog_service_1.default(mainWindow);
    dumper_1.default();
    updater_1.default();
    if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools();
    }
    if (process.platform === 'darwin') {
        template = [{
                label: 'Electron',
                submenu: [{
                        label: 'About ElectronReact',
                        selector: 'orderFrontStandardAboutPanel:'
                    }, {
                        type: 'separator'
                    }, {
                        label: 'Services',
                        submenu: []
                    }, {
                        type: 'separator'
                    }, {
                        label: 'Hide ElectronReact',
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
                            electron_1.app.quit();
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
                        label: 'Learn More',
                        click() {
                            electron_1.shell.openExternal('http://electron.atom.io');
                        }
                    }, {
                        label: 'Documentation',
                        click() {
                            electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                        }
                    }, {
                        label: 'Community Discussions',
                        click() {
                            electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                        }
                    }, {
                        label: 'Search Issues',
                        click() {
                            electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                        }
                    }]
            }];
        menu = electron_1.Menu.buildFromTemplate(template);
        electron_1.Menu.setApplicationMenu(menu);
    }
    else {
        template = [{
                label: '&File',
                submenu: [{
                        label: '&Open',
                        accelerator: 'Ctrl+O'
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
                        label: 'Learn More',
                        click() {
                            electron_1.shell.openExternal('http://electron.atom.io');
                        }
                    }, {
                        label: 'Documentation',
                        click() {
                            electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                        }
                    }, {
                        label: 'Community Discussions',
                        click() {
                            electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                        }
                    }, {
                        label: 'Search Issues',
                        click() {
                            electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                        }
                    }]
            }];
        menu = electron_1.Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
    }
});

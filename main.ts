/// <reference path="./typings/github-electron/github-electron.d.ts" />
/// <reference path="./typings/node/node.d.ts" />

import app = require("app");
import menu = require("menu");
import BrowserWindow = require("browser-window");
import CrashReporter = require("crash-reporter");
import FileDialogServices = require("./server/file-dialog-service");
import Dumper = require("./server/dumper");
import Updater = require("./server/updater");

var mainWindow: GitHubElectron.BrowserWindow;

app.on("window-all-closed", () => {
    app.quit();
});

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 600, height: 800 });
    mainWindow.loadUrl("file://" + __dirname + "/app/index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    FileDialogServices(mainWindow);
    Dumper();
    Updater();

    if (process.platform === "darwin")
        menu.setApplicationMenu(menu.buildFromTemplate([{
            label: 'KeySAVe',
            submenu: [
                {
                    label: 'About KeySAVe',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide KeySAVe',
                    accelerator: 'CmdOrCtrl+H',
                    selector: 'hide:'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    selector: 'hideOtherApplications:'
                },
                {
                    label: 'Show All',
                    selector: 'unhideAllApplications:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    selector: 'terminate:'
                },
            ]
        }, {
                label: 'Edit',
                submenu: [
                    {
                        label: 'Cut',
                        accelerator: 'CmdOrCtrl+X',
                        selector: 'cut:'
                    },
                    {
                        label: 'Copy',
                        accelerator: 'CmdOrCtrl+C',
                        selector: 'copy:'
                    },
                    {
                        label: 'Paste',
                        accelerator: 'CmdOrCtrl+V',
                        selector: 'paste:'
                    },
                    {
                        label: 'Select All',
                        accelerator: 'CmdOrCtrl+A',
                        selector: 'selectAll:'
                    }
                ]
            }]));
});

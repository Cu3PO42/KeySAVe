/// <reference path="./typings/github-electron/github-electron.d.ts" />
/// <reference path="./typings/node/node.d.ts" />

import { app, Menu, BrowserWindow } from "electron";
import FileDialogServices from "./server/file-dialog-service";
import Dumper from "./server/dumper";
import Updater from "./server/updater";
import "./init/promisify-fs";

var mainWindow: GitHubElectron.BrowserWindow;

app.on("window-all-closed", () => {
    app.quit();
});

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 600, height: 800 });
    mainWindow.loadURL("file://" + __dirname + "/app/index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    FileDialogServices(mainWindow);
    Dumper();
    Updater();

    if (false && process.platform === "darwin")
        Menu.setApplicationMenu(Menu.buildFromTemplate([{
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
                        label: 'Undo',
                        accelerator: 'CmdOrCtrl+Z',
                        selector: 'undo:'
                    },
                    {
                        label: 'Redo',
                        accelerator: 'CmdOrCtrl+Shift+Z'
                    },
                    {
                        type: 'separator'
                    },
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

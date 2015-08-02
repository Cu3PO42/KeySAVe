/// <reference path="./typings/github-electron/github-electron.d.ts" />
/// <reference path="./typings/node/node.d.ts" />

import app = require("app");
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
    mainWindow = new BrowserWindow({width: 600, height: 800});
    mainWindow.loadUrl("file://" + __dirname + "/app/index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    FileDialogServices(mainWindow);
    Dumper();
    Updater(mainWindow);
})

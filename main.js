/// <reference path="./typings/github-electron/github-electron.d.ts" />
/// <reference path="./typings/node/node.d.ts" />
var app = require("app");
var BrowserWindow = require("browser-window");
var FileDialogServices = require("./server/file-dialog-service");
var Dumper = require("./server/dumper");
var mainWindow;
app.on("window-all-closed", function () {
    app.quit();
});
app.on("ready", function () {
    mainWindow = new BrowserWindow({ width: 600, height: 800 });
    mainWindow.loadUrl("file://" + __dirname + "/app/index.html");
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    FileDialogServices(mainWindow);
    Dumper();
});

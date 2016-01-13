var app = require("app");
var menu = require("menu");
var BrowserWindow = require("browser-window");
var FileDialogServices = require("./server/file-dialog-service");
var Dumper = require("./server/dumper");
var Updater = require("./server/updater");
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

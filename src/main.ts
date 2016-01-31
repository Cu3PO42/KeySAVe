import { app, Menu, BrowserWindow } from "electron";
import FileDialogServices from "./server/file-dialog-service";
import Dumper from "./server/dumper";
import Updater from "./server/updater";
import * as fs from "fs-extra";
import { fork } from "child_process";
import "./init/promisify-fs";

var mainWindow: GitHubElectron.BrowserWindow;

app.on("window-all-closed", () => {
    app.quit();
});

var keyPath = app.getPath("userData")+"/keys";
if (true || !fs.existsSync(keyPath)) {
    (async function() {
        await fs.mkdirpAsync(app.getPath("userData"));
        await fs.moveAsync(app.getPath("home") + "/Documents/KeySAVe/data", keyPath, { clobber: false });
        var searcher = fork(__dirname + "/workers/search-keysav.js");
        searcher.send({ path: app.getPath("home"), depth: 5 });
        searcher.on("message", async function(path) {
            try {
                await fs.readdirAsync(path + "/data").map(async (file) => {
                    try {
                        var stats = await fs.statAsync(path + "/data/" + file);
                        if (stats.isFile() && !(await fs.existsAsync(keyPath + file))
                        && (stats.size === 0xB4AD4 || stats.size === 0x1000)) {
                            await fs.copyAsync(path + "/data/" + file, keyPath + "/" + file);
                        }
                    } catch (e) {}
                });
            } catch (e) {}
        });
    })();
}

app.on("ready", () => {
    mainWindow = new BrowserWindow({ width: 600, height: 800 });
    mainWindow.loadURL("file://" + __dirname + "/app/index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    FileDialogServices(mainWindow);
    Dumper();
    Updater();

    if (process.platform === "darwin")
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

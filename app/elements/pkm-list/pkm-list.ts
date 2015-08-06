/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />

import handlebars = require("handlebars");
import fs = require("fs");
import localization = require("keysavcore/Localization");
import remote = require("remote");
import IpcClient = require("electron-ipc-tunnel/client");
import path = require("path");

handlebars.registerHelper(require("handlebars-helper-moment")());

(() => {
var clipboard = remote.require("clipboard");

var handlebarsHelpers: {[helper: string]: Function} = {
    row: function() {
        return Math.floor(this.slot/6) + 1;
    },
    column: function() {
        return this.slot%6 + 1;
    },
    box: function() {
        return this.box+1;
    },
    speciesName: function() {
        return localization.en.species[this.species];
    },
    hasAlternateForm: function() {
        return !!localization.en.forms[this.species];
    },
    formName: function() {
        return localization.en.forms[this.species] ? localization.en.forms[this.species][this.form] : "";
    },
    natureName: function() {
        return localization.en.natures[this.nature];
    },
    abilityName: function() {
        return localization.en.abilities[this.ability];
    },
    typeName: function(typeId) {
        return localization.en.types[typeId];
    },
    moveName: function(moveId) {
        return moveId ? localization.en.moves[moveId] : "";
    },
    itemName: function(itemId) {
        return itemId ? localization.en.items[itemId] : "";
    },
    ballImage: function(ball) {
        return "[](/" + localization.en.items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")"
    },
    esv: function() {
        return ("0000"+this.esv).slice(-4);
    },
    tsv: function() {
        return ("0000"+this.tsv).slice(-4);
    },
    language: function() {
        return localization.en.languageTags[this.otLang];
    },
    genderString: function(gender) {
        switch (gender) {
            case 0:
                return "♂";
            case 1:
                return "♀";
            case 2:
                return "-";
        }
    },
    gameVersionString: function() {
        return localization.en.games[this.gameVersion];
    },
    stepsToHatch: function() {
        return this.isEgg * (this.otFriendship-1) * 256;
    },
    hasHa: function() {
        return this.abilityNum === 4;
    },
    checkmark: function(condition) {
        return condition ? "✓" : "✗";
    },
    pentagon: function() {
        return this.gameVersion >= 24 && this.gameVersion <= 27 ? "⬟" : "";
    },
    shinyMark: function() {
        return this.isShiny ? "★" : "";
    },
    markings: function() {
        return ((this.markings&0x01 ? "●" : "◯")
              + (this.markings&0x02 ? "▲" : "△")
              + (this.markings&0x04 ? "■" : "□")
              + (this.markings&0x08 ? "♥" : "♡")
              + (this.markings&0x10 ? "★" : "☆")
              + (this.markings&0x20 ? "◆" : "◇"));
    },
    regionName: function() {
        return localization.en.regions[this.gameVersion];
    },
    countryName: function() {
        return localization.en.countries[this.countryID];
    },
    toJson: function(e) {
        return new handlebars.SafeString(JSON.stringify(e));
    }
};

handlebars.registerHelper(handlebarsHelpers);

var knownHelpers = Object.keys(handlebarsHelpers);
knownHelpers.push("moment");

@component("pkm-list")
class PkmList extends polymer.Base {
    @property({type: Array})
    pokemon: any[] = [];

    @property({type: String})
    formatString: string;

    @property({type: String})
    formatHeader: string;

    @property({type: String})
    formatName: string;

    @property({type: Number})
    lowerBox: number;

    @property({type: Number})
    upperBox: number;

    @property({type: String})
    fileName: string;

    @property({type: String})
    dialogResult: string;

    private template: Handlebars.HandlebarsTemplateDelegate;
    private formatCache: {[pid: number]: string} = {};
    private ipcClient: IpcClient;

    constructor() {
        super();

        this.ipcClient = new IpcClient();

        this.ipcClient.on("file-dialog-save-result", (filename) => {
            if (filename)
                fs.writeFile(filename, this.$.container.innerText, {encoding: "utf-8"}, (err) => {
                    if (err === null) {
                        this.dialogResult = "File saved successfully!";
                    }
                    else {
                        this.dialogResult = "Couldn't save file. Please try again.";
                    }
                    this.$.dialog.toggle();
                });
        });
    }

    formatPokemon(pkm) {
        var uuid = pkm.box*30+pkm.slot;
        var cached = this.formatCache[uuid];
        if (cached)
            return cached;
        else
            return this.formatCache[uuid] = this.template(pkm);
    }

    isEmpty(pkm) {
        return pkm.length === 0;
    }

    filterPokemon(pkm) {
        return (this.lowerBox === undefined || pkm.box+1 >= this.lowerBox) && (this.upperBox === undefined || pkm.box < this.upperBox);
    }

    copyClipboard() {
        clipboard.write({text: this.$.container.innerText, html: this.$.container.innerHTML});
    }

    save() {
        var ext: string;
        var filters: any[];
        if (this.formatName.toLowerCase().indexOf("csv") !== -1) {
            ext = ".csv"
            filters = [{name: "CSV", extensions: ["csv"]}]
        }
        else if (this.formatName.toLowerCase().indexOf("json") !== -1) {
            ext = ".json"
            filters = [{name: "JSON", extensions: ["json"]}]
        }
        else {
            ext = ".txt"
            filters = [{name: "Text", extensions: ["txt"]}];
        }
        this.ipcClient.send("file-dialog-save", {options: {defaultPath: path.basename(this.fileName, path.extname(this.fileName))+ext, filters: filters}});
    }

    @observe("formatString")
    formatStringChanged(newValue, oldValue) {
        this.debounce("compileTemplate", () => {
            this.formatCache = {};
            try {
                this.template = handlebars.compile(newValue, {knownHelpers: knownHelpers});
            }
            catch (e) {}
        }, 500);
    }

    @observe("lowerBox, upperBox")
    filterRestrictionsChanged(lowerBox, upperBox) {
        this.$.list.render();
    }

    @observe("pokemon")
    pokemonChanged(newValue, oldValue) {
        this.formatCache = {};
    }
}
polymer.createElement(PkmList);
})()

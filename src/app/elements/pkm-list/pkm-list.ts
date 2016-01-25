/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../../../typings/path-extra/path-extra.d.ts" />
/// <reference path="../../../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../../../typings/bluebird/bluebird.d.ts" />

import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import { Pkx, Localization, Calculator as StatCalculator } from "keysavcore";
import { remote } from "electron";
import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";
import * as path from "path-extra";
import * as Promise from "bluebird";
import * as _ from "lodash";

handlebars.registerHelper(require("handlebars-helper-moment")());

(() => {
function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}

var dbDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "db");
mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
mkdirOptional(dbDirectory);

var clipboard = remote.require("clipboard");

@component("pkm-list")
class PkmList extends PolymerElement {
    @property({type: Array})
    pokemon: any[];

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

    @property({type: String})
    language: string;

    @property({type: Object})
    Localization: typeof Localization.en;

    @property({type: Object, value: function() {
        return [{
            name: "pkm-list-grow-height-animation",
            timing: {
                delay: 100,
                duration: 400
            }
        }];
    }})
    entryAnimationConfig: any;

    @property({type: Object, value: function() {
        return [{
            name: "pkm-list-shrink-height-animation",
            timing: {
                delay: 100,
                duration: 400
            }
        }];
    }})
    exitAnimationConfig: any;

    // =========================================================================

    @property({type: Boolean})
    filtersActive: boolean;

    @property({type: String})
    filteredGender: string;

    @property({type: Boolean})
    filteredEggs: boolean;

    @property({type: Boolean})
    filteredHa: boolean;

    @property({type: Boolean})
    filteredSpecialAttacker: boolean;

    @property({type: Boolean})
    filteredTrickRoom: boolean;

    @property({type: Number})
    filteredNoIvs: number;

    @property({type: Boolean})
    filteredAllIvs: boolean;

    @property({type: Boolean})
    filteredHp: boolean;

    @property({type: Boolean})
    filteredAtk: boolean;

    @property({type: Boolean})
    filteredDef: boolean;

    @property({type: Boolean})
    filteredSpAtk: boolean;

    @property({type: Boolean})
    filteredSpDef: boolean;

    @property({type: Boolean})
    filteredSpe: boolean;

    @property({type: Boolean})
    filteredShiny: boolean;

    @property({type: Boolean})
    filteredShinyOverride: boolean;

    @property({type: Boolean})
    filteredMySv: boolean;

    @property({type: Boolean})
    filteredSvs: boolean;

    @property({type: Array})
    filteredSvList: number[];

    @property({type: Array})
    filteredHpTypes: number[];

    @property({type: Array})
    filteredSpecies: number[];

    @property({type: Array})
    filteredAbilities: number[];

    @property({type: Array})
    filteredNatures: number[];

    // =========================================================================

    private template: HandlebarsTemplateDelegate;
    private formatCache: {[pid: number]: string};
    private ipcClient: IpcClient;
    private handlebarsHelpers: {[helper: string]: Function};
    private knownHelpers: string[];
    private internalIvChange: boolean;

    attached() {
        this.ipcClient = new IpcClient();
        this.formatCache = {};
        this.internalIvChange = false;

        this.pokemon = [];
        this.filtersActive = false;
        this.filteredGender = "any";
        this.filteredEggs = false;
        this.filteredHa = false;
        this.filteredSpecialAttacker = false;
        this.filteredTrickRoom = false;
        this.filteredNoIvs = 0;
        this.filteredAllIvs = false;
        this.filteredHp = false;
        this.filteredAtk = false;
        this.filteredDef = false;
        this.filteredSpAtk = false;
        this.filteredSpDef = false;
        this.filteredSpe = false;
        this.filteredShinyOverride = false;
        this.filteredMySv = false;
        this.filteredSvList = [];
        this.filteredHpTypes = [];
        this.filteredSpecies = [];
        this.filteredAbilities = [];
        this.filteredNatures = [];

        var self = this;
        this.handlebarsHelpers = {
            row: function() {
                return Math.floor(this.slot/6) + 1;
            },
            column: function() {
                return this.slot%6 + 1;
            },
            box: function() {
                return this.box+1;
            },
            level: function() {
                return StatCalculator.level(this);
            },
            hp: function() {
                return StatCalculator.hp(this);
            },
            atk: function() {
                return StatCalculator.atk(this);
            },
            def: function() {
                return StatCalculator.def(this);
            },
            spAtk: function() {
                return StatCalculator.spAtk(this);
            },
            spDef: function() {
                return StatCalculator.spDef(this);
            },
            spe: function() {
                return StatCalculator.spe(this);
            },
            speciesName: function() {
                return Localization[self.language].species[this.species];
            },
            hasAlternateForm: function() {
                return !!Localization[self.language].forms[this.species];
            },
            formName: function() {
                return Localization[self.language].forms[this.species] ? Localization[self.language].forms[this.species][this.form] : "";
            },
            natureName: function() {
                return Localization[self.language].natures[this.nature];
            },
            abilityName: function() {
                return Localization[self.language].abilities[this.ability];
            },
            typeName: function(typeId) {
                return Localization[self.language].types[typeId];
            },
            moveName: function(moveId) {
                return moveId ? Localization[self.language].moves[moveId] : "";
            },
            itemName: function(itemId) {
                return itemId ? Localization[self.language].items[itemId] : "";
            },
            ballName: function() {
                return Localization[self.language].getBallName(this.ball);
            },
            metLocationName: function() {
                return Localization[self.language].getLocation(this);
            },
            eggLocationName: function() {
                return Localization[self.language].getEggLocation(this);
            },
            ballImage: function(ball) {
                return "[](/" + Localization[self.language].items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")"
            },
            esv: function() {
                return ("0000"+this.esv).slice(-4);
            },
            tsv: function() {
                return ("0000"+this.tsv).slice(-4);
            },
            language: function() {
                return Localization[self.language].languageTags[this.otLang];
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
                return Localization[self.language].games[this.gameVersion];
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
                return Localization[self.language].regions[this.gameVersion];
            },
            countryName: function() {
                return Localization[self.language].countries[this.countryID];
            },
            ribbons: function() {
                return Localization[self.language].getRibbons(this);
            },
            toJson: function(e) {
                return new handlebars.SafeString(JSON.stringify(e));
            }
        };

        this.knownHelpers = Object.keys(this.handlebarsHelpers);
        this.knownHelpers.push("moment");
    }

    formatPokemon(pkm) {
        var uuid = pkm.box*30+pkm.slot;
        var cached = this.formatCache[uuid];
        if (cached)
            return cached;
        else
            return this.formatCache[uuid] = this.template(pkm, {helpers: this.handlebarsHelpers});
    }

    isEmpty(pkm) {
        return pkm.length === 0;
    }

    filterPokemon(pkm: Pkx) {
        if (!((this.lowerBox === undefined || pkm.box+1 >= this.lowerBox) && (this.upperBox === undefined || pkm.box < this.upperBox)))
            return false;
        if (!this.filtersActive)
            return true;
        var shinyCondition = (this.filteredShiny && (!pkm.isEgg && !pkm.isShiny || pkm.isEgg && !this.filteredMySv && !this.filteredSvs)) || pkm.isEgg && ((this.filteredMySv && !pkm.isShiny && (!this.filteredSvs || this.filteredSvList.indexOf(pkm.esv) === -1)) || (this.filteredSvs && this.filteredSvList.indexOf(pkm.esv) === -1 && (!this.filteredMySv || !pkm.isShiny)));
        if (this.filteredShinyOverride && !shinyCondition)
            return true;
        if (!this.filteredShinyOverride && shinyCondition)
            return false;
        if (this.filteredEggs && !pkm.isEgg)
            return false;
        if (!(this.filteredGender === "male" && pkm.gender === 0 || this.filteredGender === "female" && pkm.gender === 1 || this.filteredGender === "any"))
            return false;
        if (this.filteredHa && pkm.abilityNum !== 4)
            return false;
        var needPerfects = this.filteredNoIvs;
        for (let iv of ["Hp", "Def", "SpAtk", "SpDef"]) {
            let val = pkm["iv"+iv];
            if (val == 31 || val == 30 && this.filteredHpTypes.length)
                --needPerfects;
            else if (this["filtered"+iv])
                return false;
        }
        var ivCompVal = Math.min(this.filteredHpTypes.length, 1);
        if (31 - pkm.ivAtk <= ivCompVal && !this.filteredSpecialAttacker || pkm.ivAtk <= ivCompVal && this.filteredSpecialAttacker)
            --needPerfects;
        else if (this.filteredAtk)
            return false;
        if (31 - pkm.ivSpe <= ivCompVal && !this.filteredTrickRoom || pkm.ivSpe <= ivCompVal && this.filteredTrickRoom)
            --needPerfects;
        else if (this.filteredSpe)
            return false;
        if (needPerfects > 0)
            return false;
        if (this.filteredHpTypes.length > 0 && this.filteredHpTypes.indexOf(pkm.hpType - 1) === -1)
            return false;
        if (this.filteredSpecies.length > 0 && this.filteredSpecies.indexOf(pkm.species) === -1)
            return false;
        if (this.filteredAbilities.length > 0 && this.filteredAbilities.indexOf(pkm.ability) === -1)
            return false;
        if (this.filteredNatures.length > 0 && this.filteredNatures.indexOf(pkm.nature) === -1)
            return false;
        return true;
    }

    copyClipboard() {
        clipboard.write({text: this.$.container.innerText, html: this.$.container.innerHTML});
    }

    async save() {
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
        var filename = await this.ipcClient.send("file-dialog-save", {options: {defaultPath: path.basename(this.fileName, path.extname(this.fileName))+ext, filters: filters}});
        if (!filename)
            return;
        try {
            await fs.writeFileAsync(filename, this.$.container.innerText, {encoding: "utf-8"});
            this.dialogResult = "File saved successfully!";
        } catch (e) {
            this.dialogResult = "Couldn't save file. Please try again.";
        }
        this.$.dialog.toggle();
    }

    async export() {
        var pkm = _.filter(this.pokemon, this.filterPokemon.bind(this))
        var ghosts = 0;
        var files = await fs.readdirAsync(dbDirectory);
        try {
            await Promise.resolve(pkm).map((pkm: Pkx) => {
                if (pkm.isGhost) {
                    ++ghosts;
                    return;
                }
                var fileName = `${("000" + pkm.species).slice(-3)} - ${pkm.nickname} - ${pkm.pid.toString(16)} - ${pkm.ec.toString(16)}`;
                var counter = 0;
                if (_.includes(files, fileName + ".pk6")) {
                    ++counter;
                    while (_.includes(files, fileName + " (" + counter + ").pk6")) ++counter;
                }
                fileName += (counter ? " (" + counter + ")" : "")+".pk6";
                files.push(fileName);
                return fs.writeFileAsync(path.join(dbDirectory, fileName), new Buffer(pkm.data));
            });
            this.dialogResult = "Saved " + (pkm.length-ghosts) + " Pokémon.";
        } catch (e) {
            this.dialogResult = "An error occured.";
            this.$.dialog.toggle();
        }
        this.$.dialog.toggle();
    }

    @observe("formatString")
    formatStringChanged(newValue, oldValue) {
        this.debounce("compileTemplate", () => {
            this.formatCache = {};
            try {
                this.template = handlebars.compile(newValue, {knownHelpers: this.knownHelpers});
            }
            catch (e) {}
        }, 500);
    }

    @observe("lowerBox, upperBox, filteredGender, filteredEggs, filteredHa, filteredMySv, filteredSvs, filteredSvList, filteredShiny, filteredShinyOverride, filteredSpecialAttacker, filteredTrickRoom, filteredNoIvs, filtersActive")
    filterRestrictionsChanged() {
        this.$.list.render();
    }

    @observe("filteredHp, filteredAtk, filteredDef, filteredSpAtk, filteredSpDef, filteredSpe")
    filterIvChanged(hp, atk, def, spAtk, spDef, spe) {
        this.filteredAllIvs = hp && atk && def && spAtk && spDef && spe;
        this.internalIvChange = true;
        this.$.list.render();
    }

    @observe("filteredAllIvs")
    filterAllIvsChanged(newValue, oldValue) {
        if (newValue) {
            this.filteredHp = this.filteredAtk = this.filteredDef = this.filteredSpAtk = this.filteredSpDef = this.filteredSpe = true;
            // Yes, we actually need to set this twice.
            // Don't ask why.
            this.filteredSpe = true;
        }
        else if (oldValue && !this.internalIvChange)
            this.filteredHp = this.filteredAtk = this.filteredDef = this.filteredSpAtk = this.filteredSpDef = this.filteredSpe = false;
        this.internalIvChange = false;
        this.$.list.render();
    }

    @observe("pokemon, language")
    pokemonChanged(pokemon, language) {
        this.formatCache = {};
    }

    @observe("language")
    languageChanged(newValue, oldValue) {
        var loc = _.clone(Localization[newValue]);
        loc.types = loc.types.slice(1, -1);
        loc.species = _.sortBy(loc.species.slice(1).map(function(e, i) {
            return {name: e, id: i+1};
        }), "name");
        loc.abilities= _.sortBy(loc.abilities.slice(1).map(function(e, i) {
            return {name: e, id: i+1};
        }), "name");
        this.Localization = loc;
        this.async(() => {
            for (let name of ["filterHpTypes", "filterSpecies", "filterAbilities", "filterNatures"]) {
                let el = this.$[name];
                let cel = el.contentElement;
                cel._selectMulti(cel.selectedValues);
                el._computeSelectedItemLabel(cel.selectedItems);
            }
        });
    }

    changedFilteredSvList(e) {
        this.filteredSvList = (e.detail.value.match(/\d+/g) || []).map((e) => parseInt(e));
    }

    clearFilterList(e) {
        var t = e.target;
        while (t.nodeName != "PAPER-ICON-BUTTON")
            t = t.parentNode;
        this.$[t.getAttribute("data-list")].contentElement.selectedValues = [];
        this.$.list.render();
    }

    not(value) {
        return !value;
    }
}
Polymer(PkmList);
})()

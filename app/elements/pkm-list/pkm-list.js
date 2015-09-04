/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../../../typings/path-extra/path-extra.d.ts" />
/// <reference path="../../../typings/bluebird/bluebird.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var handlebars = require("handlebars");
var fs = require("fs");
var localization = require("keysavcore/Localization");
var StatCalculator = require("keysavcore/Calculator");
var remote = require("remote");
var IpcClient = require("electron-ipc-tunnel/client");
var path = require("path-extra");
var Promise = require("bluebird");
var _ = require("lodash");
Promise.promisifyAll(fs);
handlebars.registerHelper(require("handlebars-helper-moment")());
(function () {
    function mkdirOptional(path) {
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
    }
    var dbDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "db");
    mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
    mkdirOptional(dbDirectory);
    var clipboard = remote.require("clipboard");
    var PkmList = (function (_super) {
        __extends(PkmList, _super);
        function PkmList() {
            var _this = this;
            _super.call(this);
            this.pokemon = [];
            this.filteredGender = "any";
            this.filteredEggs = false;
            this.filteredHa = false;
            this.filteredSpecialAttacker = false;
            this.filteredTrickRoom = false;
            this.filteredNoIvs = 0;
            this.filteredHp = false;
            this.filteredAtk = false;
            this.filteredDef = false;
            this.filteredSpAtk = false;
            this.filteredSpDef = false;
            this.filteredSpe = false;
            this.filteredShiny = false;
            this.filteredShinyOverride = false;
            this.filteredMySv = false;
            this.filteredSvs = false;
            this.filteredSvList = [];
            this.filteredHpTypes = [];
            this.filteredSpecies = [];
            this.formatCache = {};
            this.ipcClient = new IpcClient();
            this.ipcClient.on("file-dialog-save-result", function (filename) {
                if (filename)
                    fs.writeFile(filename, _this.$.container.innerText, { encoding: "utf-8" }, function (err) {
                        if (err === null) {
                            _this.dialogResult = "File saved successfully!";
                        }
                        else {
                            _this.dialogResult = "Couldn't save file. Please try again.";
                        }
                        _this.$.dialog.toggle();
                    });
            });
            var self = this;
            this.handlebarsHelpers = {
                row: function () {
                    return Math.floor(this.slot / 6) + 1;
                },
                column: function () {
                    return this.slot % 6 + 1;
                },
                box: function () {
                    return this.box + 1;
                },
                level: function () {
                    return StatCalculator.level(this);
                },
                hp: function () {
                    return StatCalculator.hp(this);
                },
                atk: function () {
                    return StatCalculator.atk(this);
                },
                def: function () {
                    return StatCalculator.def(this);
                },
                spAtk: function () {
                    return StatCalculator.spAtk(this);
                },
                spDef: function () {
                    return StatCalculator.spDef(this);
                },
                spe: function () {
                    return StatCalculator.spe(this);
                },
                speciesName: function () {
                    return localization[self.language].species[this.species];
                },
                hasAlternateForm: function () {
                    return !!localization[self.language].forms[this.species];
                },
                formName: function () {
                    return localization[self.language].forms[this.species] ? localization[self.language].forms[this.species][this.form] : "";
                },
                natureName: function () {
                    return localization[self.language].natures[this.nature];
                },
                abilityName: function () {
                    return localization[self.language].abilities[this.ability];
                },
                typeName: function (typeId) {
                    return localization[self.language].types[typeId];
                },
                moveName: function (moveId) {
                    return moveId ? localization[self.language].moves[moveId] : "";
                },
                itemName: function (itemId) {
                    return itemId ? localization[self.language].items[itemId] : "";
                },
                metLocationName: function () {
                    return localization[self.language].getLocation(this);
                },
                eggLocationName: function () {
                    return localization[self.language].getEggLocation(this);
                },
                ballImage: function (ball) {
                    return "[](/" + localization[self.language].items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")";
                },
                esv: function () {
                    return ("0000" + this.esv).slice(-4);
                },
                tsv: function () {
                    return ("0000" + this.tsv).slice(-4);
                },
                language: function () {
                    return localization[self.language].languageTags[this.otLang];
                },
                genderString: function (gender) {
                    switch (gender) {
                        case 0:
                            return "♂";
                        case 1:
                            return "♀";
                        case 2:
                            return "-";
                    }
                },
                gameVersionString: function () {
                    return localization[self.language].games[this.gameVersion];
                },
                stepsToHatch: function () {
                    return this.isEgg * (this.otFriendship - 1) * 256;
                },
                hasHa: function () {
                    return this.abilityNum === 4;
                },
                checkmark: function (condition) {
                    return condition ? "✓" : "✗";
                },
                pentagon: function () {
                    return this.gameVersion >= 24 && this.gameVersion <= 27 ? "⬟" : "";
                },
                shinyMark: function () {
                    return this.isShiny ? "★" : "";
                },
                markings: function () {
                    return ((this.markings & 0x01 ? "●" : "◯")
                        + (this.markings & 0x02 ? "▲" : "△")
                        + (this.markings & 0x04 ? "■" : "□")
                        + (this.markings & 0x08 ? "♥" : "♡")
                        + (this.markings & 0x10 ? "★" : "☆")
                        + (this.markings & 0x20 ? "◆" : "◇"));
                },
                regionName: function () {
                    return localization[self.language].regions[this.gameVersion];
                },
                countryName: function () {
                    return localization[self.language].countries[this.countryID];
                },
                toJson: function (e) {
                    return new handlebars.SafeString(JSON.stringify(e));
                }
            };
            this.knownHelpers = Object.keys(this.handlebarsHelpers);
            this.knownHelpers.push("moment");
        }
        PkmList.prototype.formatPokemon = function (pkm) {
            var uuid = pkm.box * 30 + pkm.slot;
            var cached = this.formatCache[uuid];
            if (cached)
                return cached;
            else
                return this.formatCache[uuid] = this.template(pkm, { helpers: this.handlebarsHelpers });
        };
        PkmList.prototype.isEmpty = function (pkm) {
            return pkm.length === 0;
        };
        PkmList.prototype.filterPokemon = function (pkm) {
            if (!((this.lowerBox === undefined || pkm.box + 1 >= this.lowerBox) && (this.upperBox === undefined || pkm.box < this.upperBox)))
                return false;
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
            for (var _i = 0, _a = ["Hp", "Def", "SpAtk", "SpDef"]; _i < _a.length; _i++) {
                var iv = _a[_i];
                if (pkm["iv" + iv] == 31)
                    --needPerfects;
                else if (this["filtered" + iv])
                    return false;
            }
            if (pkm.ivAtk == 31 && !this.filteredSpecialAttacker || pkm.ivAtk == 0 && this.filteredSpecialAttacker)
                --needPerfects;
            else if (this.filteredAtk)
                return false;
            if (pkm.ivSpe == 31 && !this.filteredTrickRoom || pkm.ivSpe == 0 && this.filteredTrickRoom)
                --needPerfects;
            else if (this.filteredSpe)
                return false;
            if (needPerfects > 0)
                return false;
            if (this.filteredHpTypes.length > 0 && this.filteredHpTypes.indexOf(pkm.hpType - 1) === -1)
                return false;
            if (this.filteredSpecies.length > 0 && this.filteredSpecies.indexOf(pkm.species) === -1)
                return false;
            return true;
        };
        PkmList.prototype.copyClipboard = function () {
            clipboard.write({ text: this.$.container.innerText, html: this.$.container.innerHTML });
        };
        PkmList.prototype.save = function () {
            var ext;
            var filters;
            if (this.formatName.toLowerCase().indexOf("csv") !== -1) {
                ext = ".csv";
                filters = [{ name: "CSV", extensions: ["csv"] }];
            }
            else if (this.formatName.toLowerCase().indexOf("json") !== -1) {
                ext = ".json";
                filters = [{ name: "JSON", extensions: ["json"] }];
            }
            else {
                ext = ".txt";
                filters = [{ name: "Text", extensions: ["txt"] }];
            }
            this.ipcClient.send("file-dialog-save", { options: { defaultPath: path.basename(this.fileName, path.extname(this.fileName)) + ext, filters: filters } });
        };
        PkmList.prototype.export = function () {
            var _this = this;
            var pkm = _.filter(this.pokemon, this.filterPokemon.bind(this));
            var ghosts = 0;
            fs.readdirAsync(dbDirectory)
                .then(function (files) {
                return Promise.resolve(pkm).map(function (pkm) {
                    if (pkm.isGhost) {
                        ++ghosts;
                        return;
                    }
                    var fileName = ("000" + pkm.species).slice(-3) + " - " + pkm.nickname + " - " + pkm.pid.toString(16) + " - " + pkm.ec.toString(16);
                    var counter = 0;
                    if (_.includes(files, fileName + ".pk6")) {
                        ++counter;
                        while (_.includes(files, fileName + " (" + counter + ").pk6"))
                            ++counter;
                    }
                    fileName += (counter ? " (" + counter + ")" : "") + ".pk6";
                    files.push(fileName);
                    return fs.writeFileAsync(path.join(dbDirectory, fileName), new Buffer(pkm.data));
                });
            })
                .then(function () {
                _this.dialogResult = "Saved " + (pkm.length - ghosts) + " Pokémon.";
                _this.$.dialog.toggle();
            })
                .catch(function (e) {
                console.log(e);
                _this.dialogResult = "An error occured.";
                _this.$.dialog.toggle();
            });
        };
        PkmList.prototype.formatStringChanged = function (newValue, oldValue) {
            var _this = this;
            this.debounce("compileTemplate", function () {
                _this.formatCache = {};
                try {
                    _this.template = handlebars.compile(newValue, { knownHelpers: _this.knownHelpers });
                }
                catch (e) { }
            }, 500);
        };
        PkmList.prototype.filterRestrictionsChanged = function () {
            this.$.list.render();
        };
        PkmList.prototype.pokemonChanged = function (pokemon, language) {
            this.formatCache = {};
        };
        PkmList.prototype.languageChanged = function (newValue, oldValue) {
            var _this = this;
            var loc = _.clone(localization[newValue]);
            loc.types = loc.types.slice(1, -1);
            loc.species = _.sortBy(loc.species.slice(1).map(function (e, i) {
                return { name: e, id: i + 1 };
            }), "name");
            this.localization = loc;
            this.async(function () {
                for (var _i = 0, _a = ["filterHpTypes", "filterSpecies"]; _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    var el = _this.$[name_1];
                    var cel = el.contentElement;
                    cel._selectMulti(cel.selectedValues);
                    el._computeSelectedItemLabel(cel.selectedItems);
                }
            });
        };
        PkmList.prototype.changedFilteredSvList = function (e) {
            this.filteredSvList = (e.detail.value.match(/\d+/g) || []).map(function (e) { return parseInt(e); });
        };
        PkmList.prototype.not = function (value) {
            return !value;
        };
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], PkmList.prototype, "pokemon");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "formatString");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "formatHeader");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "formatName");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], PkmList.prototype, "lowerBox");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], PkmList.prototype, "upperBox");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "fileName");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "dialogResult");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "language");
        __decorate([
            property({ type: Object }), 
            __metadata('design:type', Object)
        ], PkmList.prototype, "localization");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], PkmList.prototype, "filteredGender");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredEggs");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredHa");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredSpecialAttacker");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredTrickRoom");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], PkmList.prototype, "filteredNoIvs");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredHp");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredAtk");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredDef");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredSpAtk");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredSpDef");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredSpe");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredShiny");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredShinyOverride");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredMySv");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], PkmList.prototype, "filteredSvs");
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], PkmList.prototype, "filteredSvList");
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], PkmList.prototype, "filteredHpTypes");
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], PkmList.prototype, "filteredSpecies");
        Object.defineProperty(PkmList.prototype, "formatStringChanged",
            __decorate([
                observe("formatString"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "formatStringChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "formatStringChanged")));
        Object.defineProperty(PkmList.prototype, "filterRestrictionsChanged",
            __decorate([
                observe("lowerBox, upperBox, filteredGender, filteredEggs, filteredHa, filteredMySv, filteredSvs, filteredSvList, filteredShiny, filteredShinyOverride, filteredHp, filteredAtk, filteredDef, filteredSpAtk, filteredSpDef, filteredSpe, filteredSpecialAttacker, filteredTrickRoom, filteredNoIvs"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "filterRestrictionsChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "filterRestrictionsChanged")));
        Object.defineProperty(PkmList.prototype, "pokemonChanged",
            __decorate([
                observe("pokemon, language"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "pokemonChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "pokemonChanged")));
        Object.defineProperty(PkmList.prototype, "languageChanged",
            __decorate([
                observe("language"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "languageChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "languageChanged")));
        PkmList = __decorate([
            component("pkm-list"), 
            __metadata('design:paramtypes', [])
        ], PkmList);
        return PkmList;
    })(polymer.Base);
    polymer.createElement(PkmList);
})();

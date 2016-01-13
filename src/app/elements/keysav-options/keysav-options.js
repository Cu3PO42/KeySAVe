var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var fs = require("fs");
var path = require("path-extra");
var _ = require("lodash");
var handlebars = require("handlebars");
function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}
(function () {
    var keysavDir = path.join(path.homedir(), "Documents", "KeySAVe");
    var configFile = path.join(keysavDir, "config.json");
    mkdirOptional(keysavDir);
    var config = {
        "defaultFormattingOptions": [
            {
                "name": "Default",
                "isDefault": true,
                "header": "Box - Slot - Species (Gender) - Nature - Ability - HP.ATK.DEF.SPATK.SPDEF.SPE - HP [ESV]",
                "format": "B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]"
            },
            {
                "name": "Reddit",
                "isDefault": true,
                "header": "Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPATK.SPDEF.SPE | HP | [ESV]<br>|---|---|---|---|---|---|---|---|",
                "format": "B{{box}} | {{row}},{{column}} | {{speciesName}} ({{genderString gender}}) | {{natureName}} | {{abilityName}} | {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} | {{typeName hpType}} | [{{esv}}]"
            },
            {
                "name": "TSV",
                "isDefault": true,
                "header": "Box - Slot - OT - TID - SID - TSV",
                "format": "B{{box}} - {{row}},{{column}} - {{ot}} - {{tid}} - {{sid}} - {{tsv}}"
            },
            {
                "name": "JSON",
                "isDefault": true,
                "header": "",
                "format": "{{toJson this}}"
            },
            {
                "name": "CSV",
                "isDefault": true,
                "header": "Box,Row,Column,Species,Gender,Nature,Ability,HP,ATK,DEF,SPATK,SPDEF,SPE,Hidden Power,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg",
                "format": "{{box}},{{row}},{{column}},{{speciesName}},{{genderString gender}},{{natureName}},{{abilityName}},{{ivHp}},{{ivAtk}},{{ivDef}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{typeName hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ballName}},{{tid}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{moveName move1}},{{moveName move2}},{{moveName move3}},{{moveName move4}},{{moveName eggMove1}},{{moveName eggMove2}},{{moveName eggMove3}},{{moveName eggMove4}},{{isShiny}},{{isEgg}}"
            },
            {
                "name": "CSV (Raw data)",
                "isDefault": true,
                "header": "Box,Row,Column,Species,Gender,Nature,Ability,HP,ATK,DEF,SPATK,SPDEF,SPE,Hidden Power,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg",
                "format": "{{box}},{{row}},{{column}},{{species}},{{gender}},{{nature}},{{ability}},{{ivHp}},{{ivAtk}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ball}},{{tid}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{move1}},{{move2}},{{move3}},{{move4}},{{eggMove1}},{{eggMove2}},{{eggMove3}},{{eggMove4}},{{isShiny}},{{isEgg}}"
            }
        ],
        "selectedFormatIndex": 0,
        "language": "en"
    };
    if (fs.existsSync(configFile))
        _.extend(config, JSON.parse(fs.readFileSync(path.join(keysavDir, "config.json"), { encoding: "utf-8" })));
    Array.prototype.push.apply(config.defaultFormattingOptions, config.formattingOptions);
    config.formattingOptions = config.defaultFormattingOptions;
    var KeysavOptions = (function (_super) {
        __extends(KeysavOptions, _super);
        function KeysavOptions() {
            var _this = this;
            _super.call(this);
            this.formattingOptions = [];
            this.formattingOptions = config.formattingOptions;
            this.selectedFormatIndex = config.selectedFormatIndex;
            this.selectedFormat = this.formattingOptions[config.selectedFormatIndex];
            this.language = config.language;
            window.addEventListener("beforeunload", function (e) {
                fs.writeFileSync(configFile, JSON.stringify({ formattingOptions: _.filter(_this.formattingOptions, function (e) { return !e.isDefault; }), selectedFormatIndex: _this.selectedFormatIndex, language: _this.language }, null, 4), { encoding: "utf-8" });
            }, false);
        }
        KeysavOptions.prototype.selectedFormatIndexChanged = function (newValue, oldValue) {
            if (this.formattingOptions !== undefined && this.selectedFormat !== undefined) {
                this.selectedFormat = this.formattingOptions[newValue];
            }
        };
        KeysavOptions.prototype.selectedFormatNameChanged = function (e) {
            if (this.selectedFormat) {
                this.notifyPath("formattingOptions." + this.selectedFormatIndex + ".name", this.selectedFormat.name, false);
                this.$.dropdown._computeSelectedItemLabel(this.$.dropdown.selectedItem);
            }
        };
        KeysavOptions.prototype.addFormatOption = function () {
            this.push("formattingOptions", { name: "Custom Formatting Option", format: "", header: "", isDefault: false });
            this.selectedFormatIndex = this.formattingOptions.length - 1;
        };
        KeysavOptions.prototype.cloneFormatOption = function () {
            this.push("formattingOptions", _.defaults({ isDefault: false, name: this.selectedFormat.name + " (Clone)" }, this.selectedFormat));
            this.selectedFormatIndex = this.formattingOptions.length - 1;
        };
        KeysavOptions.prototype.deleteFormatOption = function () {
            if (this.formattingOptions.length > 1) {
                this.splice("formattingOptions", this.selectedFormatIndex, 1);
                if (this.selectedFormatIndex > this.formattingOptions.length - 1)
                    this.selectedFormatIndex = this.formattingOptions.length - 1;
                this.selectedFormat = this.formattingOptions[this.selectedFormatIndex];
            }
        };
        KeysavOptions.prototype.generateHeader = function () {
            try {
                this.set("selectedFormat.header", handlebars.compile(this.selectedFormat.format)({
                    ball: "Ball",
                    ec: "Encryption Constant",
                    pid: "PID",
                    exp: "Experience Points",
                    evHp: "HP EV",
                    evAtk: "ATK EV",
                    evDef: "DEF EV",
                    evSpAtk: "SPATK EV",
                    evSpDef: "SPDEF EV",
                    evSpe: "SPE EV",
                    ivHp: "HP IV",
                    ivAtk: "ATK IV",
                    ivDef: "DEF IV",
                    ivSpAtk: "SPATK IV",
                    ivSpDef: "SPDEF IV",
                    ivSpe: "SPE IV",
                    contestStatCool: "Contest Stat Cool",
                    contestStatBeauty: "Contest Stat Beauty",
                    contestStatCute: "Contest Stat Cute",
                    contestStatSmart: "Contest Stat Smart",
                    contestStatTough: "Contest Stat Tough",
                    hpType: "HP Type",
                    nickname: "Nickname",
                    notOT: "Not OT",
                    ot: "OT",
                    pkrsStrain: "Pokérus Strain",
                    pkrsDuration: "Pokérus Duration",
                    levelMet: "Met Level",
                    otGender: "OT Gender",
                    isEgg: true,
                    isNick: true,
                    isShiny: true,
                    isGhost: true,
                    isFatefulEncounter: true,
                    ability: "Ability",
                    abilityNum: "Ability Number",
                    nature: "Nature",
                    species: "Species",
                    heldItem: "Held Item",
                    tid: "Trainer ID",
                    sid: "Secret ID",
                    move1: "Move 1",
                    move2: "Move 2",
                    move3: "Move 3",
                    move4: "Move 4",
                    move1Pp: "Move 1 PP",
                    move2Pp: "Move 2 PP",
                    move3Pp: "Move 3 PP",
                    move4Pp: "Move 4 PP",
                    move1Ppu: "Move 1 PP Up",
                    move2Ppu: "Move 2 PP Up",
                    move3Ppu: "Move 3 PP Up",
                    move4Ppu: "Move 4 PP Up",
                    eggMove1: "Eggmove 1",
                    eggMove2: "Eggmove 2",
                    eggMove3: "Eggmove 3",
                    eggMove4: "Eggmove 4",
                    ribbonSet1: "Ribbon Set 1",
                    ribbonSet2: "Ribbon Set 2",
                    ribbonSet3: "Ribbon Set 3",
                    ribbonSet4: "Ribbon Set 4",
                    chk: "Checksum",
                    slot: "Slot",
                    form: "Form",
                    gender: "Gender",
                    metDate: "Date Met",
                    eggDate: "Date Hatched"
                }, { helpers: {
                        typeName: function (e) { return e; },
                        moveName: function (e) { return e; },
                        itemName: function (e) { return e; },
                        ballName: function () { return "Ball"; },
                        genderString: function (e) { return e; },
                        checkmark: function (e) { return e; },
                        toJson: function (e) { return "JSON"; },
                        moment: function (e) { return e; },
                        row: function () { return "Row"; },
                        column: function () { return "Column"; },
                        box: function () { return "Box"; },
                        speciesName: function () { return "Species"; },
                        formName: function () { return "Form"; },
                        natureName: function () { return "Nature"; },
                        abilityName: function () { return "Ability"; },
                        metLocationName: function () { return "Met Location"; },
                        eggLocationName: function () { return "Egg Location"; },
                        ballImage: function () { return "Ball Image"; },
                        level: function () { return "Level"; },
                        hp: function () { return "HP"; },
                        atk: function () { return "ATK"; },
                        def: function () { return "DEF"; },
                        spAtk: function () { return "SPATK"; },
                        spDef: function () { return "SPDEF"; },
                        spe: function () { return "SPE"; },
                        esv: function () { return "ESV"; },
                        tsv: function () { return "TSV"; },
                        language: function () { return "Language"; },
                        gameVersionString: function () { return "Game Version"; },
                        stepsToHatch: function () { return "Steps To Hatch"; },
                        pentagon: function () { return "Pentagon"; },
                        shinyMark: function () { return "Shiny"; },
                        markings: function () { return "Markings"; },
                        regionName: function () { return "Region"; },
                        countryName: function () { return "Country"; },
                        ribbons: function () { return ["Ribbons"]; },
                        hasHa: function () { return true; },
                    } }));
            }
            catch (e) {
                console.log(e);
            }
        };
        __decorate([
            property({ type: String, notify: true }), 
            __metadata('design:type', String)
        ], KeysavOptions.prototype, "formatString", void 0);
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Object)
        ], KeysavOptions.prototype, "formattingOptions", void 0);
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], KeysavOptions.prototype, "selectedFormatIndex", void 0);
        __decorate([
            property({ type: Object, notify: true }), 
            __metadata('design:type', Object)
        ], KeysavOptions.prototype, "selectedFormat", void 0);
        __decorate([
            property({ type: String, notify: true }), 
            __metadata('design:type', String)
        ], KeysavOptions.prototype, "language", void 0);
        __decorate([
            observe("selectedFormatIndex"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object, Object]), 
            __metadata('design:returntype', void 0)
        ], KeysavOptions.prototype, "selectedFormatIndexChanged", null);
        KeysavOptions = __decorate([
            component("keysav-options"), 
            __metadata('design:paramtypes', [])
        ], KeysavOptions);
        return KeysavOptions;
    })(polymer.Base);
    polymer.createElement(KeysavOptions);
})();
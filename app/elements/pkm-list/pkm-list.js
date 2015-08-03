/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>
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
var localization = require("keysavcore/Localization");
(function () {
    var pkmFormat = handlebars.registerHelper({
        row: function () {
            return Math.floor(this.slot / 6) + 1;
        },
        column: function () {
            return this.slot % 6 + 1;
        },
        box: function () {
            return this.box + 1;
        },
        speciesName: function () {
            return localization.en.species[this.species];
        },
        natureName: function () {
            return localization.en.natures[this.nature];
        },
        abilityName: function () {
            return localization.en.abilities[this.ability];
        },
        typeName: function (typeId) {
            return localization.en.types[typeId];
        },
        moveName: function (moveId) {
            return moveId ? localization.en.moves[moveId] : "";
        },
        ballName: function () {
            return localization.en.items[this.ball];
        },
        esv: function () {
            return ("0000" + this.esv).slice(-4);
        },
        tsv: function () {
            return ("0000" + this.tsv).slice(-4);
        },
        language: function () {
            return localization.en.languageTags[this.otLang];
        },
        genderString: function () {
            switch (this.gender) {
                case 0:
                    return "♂";
                case 1:
                    return "♀";
                case 2:
                    return "-";
            }
        },
        gameVersionString: function () {
            return localization.en.games[this.gameVersion];
        },
        toJson: function (e) {
            return new handlebars.SafeString(JSON.stringify(e));
        }
    });
    var PkmList = (function (_super) {
        __extends(PkmList, _super);
        function PkmList() {
            _super.apply(this, arguments);
            this.pokemon = [];
            this.formatCache = {};
        }
        PkmList.prototype.formatPokemon = function (pkm) {
            var uuid = pkm.box * 30 + pkm.slot;
            var cached = this.formatCache[uuid];
            if (cached)
                return cached;
            else
                return this.formatCache[uuid] = this.template(pkm);
        };
        PkmList.prototype.isEmpty = function (pkm) {
            return pkm.length === 0;
        };
        PkmList.prototype.filterPokemon = function (pkm) {
            return (this.lowerBox === undefined || pkm.box + 1 >= this.lowerBox) && (this.upperBox === undefined || pkm.box < this.upperBox);
        };
        PkmList.prototype.formatStringChanged = function (newValue, oldValue) {
            var _this = this;
            this.debounce("compileTemplate", function () {
                _this.formatCache = {};
                _this.template = handlebars.compile(newValue, { knownHelpers: ["box", "column", "row", "speciesName", "natureName", "abilityName", "typeName", "moveName", "ballName", "esv", "tsv", "language", "genderString", "gameVersionString", "toJson"] });
            }, 500);
        };
        PkmList.prototype.filterRestrictionsChanged = function (lowerBox, upperBox) {
            this.$.list.render();
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
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], PkmList.prototype, "lowerBox");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], PkmList.prototype, "upperBox");
        Object.defineProperty(PkmList.prototype, "formatStringChanged",
            __decorate([
                observe("formatString"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "formatStringChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "formatStringChanged")));
        Object.defineProperty(PkmList.prototype, "filterRestrictionsChanged",
            __decorate([
                observe("lowerBox, upperBox"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], PkmList.prototype, "filterRestrictionsChanged", Object.getOwnPropertyDescriptor(PkmList.prototype, "filterRestrictionsChanged")));
        PkmList = __decorate([
            component("pkm-list"), 
            __metadata('design:paramtypes', [])
        ], PkmList);
        return PkmList;
    })(polymer.Base);
    polymer.createElement(PkmList);
})();

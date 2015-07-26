/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
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
var format = require("string-format");
var fs = require("fs");
(function () {
    var nameData = {};
    for (var _i = 0, _a = ["de", "en", "es", "fr", "it", "ja", "ko"]; _i < _a.length; _i++) {
        var file = _a[_i];
        var data = nameData[file] = {};
        for (var _b = 0, _c = ["abilities", "forms", "items", "moves", "natures", "species", "types"]; _b < _c.length; _b++) {
            var names = _c[_b];
            data[names] = fs.readFileSync(process.cwd() + "/names/" + file + "/" + names + ".txt", { encoding: "utf-8" }).split("\n");
        }
    }
    var pkmFormat = format.create({
        row: function (slot) {
            return Math.floor(slot / 6) + 1;
        },
        column: function (slot) {
            return slot % 6 + 1;
        },
        box: function (box) {
            return box + 1;
        },
        speciesName: function (speciesId) {
            return nameData["en"]["species"][speciesId];
        },
        natureName: function (natureId) {
            return nameData["en"]["natures"][natureId];
        },
        abilityName: function (abilityId) {
            return nameData["en"]["abilities"][abilityId];
        },
        typeName: function (typeId) {
            return nameData["en"]["types"][typeId];
        }
    });
    var PkmList = (function (_super) {
        __extends(PkmList, _super);
        function PkmList() {
            _super.apply(this, arguments);
            this.pokemon = [];
        }
        PkmList.prototype.formatPokemon = function (pkm) {
            return pkmFormat("B{box!box} - {slot!row},{slot!column} - {species!speciesName} - {nature!natureName} - {ability!abilityName} - {ivHp}.{ivAtk}.{ivDef}.{ivSpAtk}.{ivSpDef}.{ivSpe} - {hpType!typeName}", pkm);
        };
        PkmList.prototype.isEmpty = function (pkm) {
            return pkm.length === 0;
        };
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], PkmList.prototype, "pokemon");
        PkmList = __decorate([
            component("pkm-list"), 
            __metadata('design:paramtypes', [])
        ], PkmList);
        return PkmList;
    })(polymer.Base);
    createElement(PkmList);
})();

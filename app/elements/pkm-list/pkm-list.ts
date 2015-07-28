/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>

import handlebars = require("handlebars");
import fs = require("fs");

(() => {
var nameData: { [language: string]: { [data: string]: string[] }} = {};
for (let file of ["de", "en", "es", "fr", "it", "ja", "ko"]) {
    let data = nameData[file] = {};
    for (let names of ["abilities", "forms", "items", "moves", "natures", "species", "types"]) {
        data[names] = fs.readFileSync(__dirname + "/../names/" + file + "/" + names  + ".txt", {encoding: "utf-8"}).split("\n");
    }
}

var pkmFormat = handlebars.registerHelper({
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
        return nameData["en"]["species"][this.species];
    },
    natureName: function() {
        return nameData["en"]["natures"][this.nature];
    },
    abilityName: function() {
        return nameData["en"]["abilities"][this.ability];
    },
    typeName: function(typeId) {
        return nameData["en"]["types"][typeId];
    }
    });

@component("pkm-list")
class PkmList extends polymer.Base {
    @property({type: Array})
    pokemon: any[] = [];

    @property({type: String})
    formatString: string;

    template: Handlebars.HandlebarsTemplateDelegate;

    formatPokemon(pkm) {
        return this.template(pkm);
    }

    isEmpty(pkm) {
        return pkm.length === 0;
    }

    @observe("formatString")
    formatStringChanged(newValue, oldValue) {
        this.template = handlebars.compile(newValue, {knownHelpers: ["box", "column", "row", "speciesName", "natureName", "abilityName", "typeName"]});
    }
}
polymer.createElement(PkmList);
})()

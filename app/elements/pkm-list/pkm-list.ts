/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>

import format = require("string-format");
import fs = require("fs");

(() => {
var nameData: { [language: string]: { [data: string]: string[] }} = {};
for (let file of ["de", "en", "es", "fr", "it", "ja", "ko"]) {
    let data = nameData[file] = {};
    for (let names of ["abilities", "forms", "items", "moves", "natures", "species", "types"]) {
        data[names] = fs.readFileSync(process.cwd() + "/names/" + file + "/" + names  + ".txt", {encoding: "utf-8"}).split("\n");
    }
}

var pkmFormat = format.create({
    row: function(slot) {
        return Math.floor(slot/6) + 1;
    },
    column: function(slot) {
        return slot%6 + 1;
    },
    box: function(box) {
        return box+1;
    },
    speciesName: function(speciesId) {
        return nameData["en"]["species"][speciesId];
    },
    natureName: function(natureId) {
        return nameData["en"]["natures"][natureId];
    },
    abilityName: function(abilityId) {
        return nameData["en"]["abilities"][abilityId];
    },
    typeName: function(typeId) {
        return nameData["en"]["types"][typeId];
    }
    });

@component("pkm-list")
class PkmList extends polymer.Base {
    @property({type: Array})
    pokemon: any[] = [];

    formatPokemon(pkm) {
        return pkmFormat("B{box!box} - {slot!row},{slot!column} - {species!speciesName} - {nature!natureName} - {ability!abilityName} - {ivHp}.{ivAtk}.{ivDef}.{ivSpAtk}.{ivSpDef}.{ivSpe} - {hpType!typeName}", pkm);
    }

    isEmpty(pkm) {
        return pkm.length === 0;
    }
}
createElement(PkmList);
})()

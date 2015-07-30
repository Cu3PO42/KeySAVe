/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/handlebars/handlebars.d.ts"/>

import handlebars = require("handlebars");
import fs = require("fs");
import localization = require("keysavcore/Localization");

(() => {
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
        return localization.en.species[this.species];
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
    esv: function() {
        return ("0000"+this.esv).slice(-4);
    },
    tsv: function() {
        return ("0000"+this.tsv).slice(-4);
    },
    language: function() {
        return localization.en.languageTags[this.otLang];
    },
    toJson: function(e) {
        return new handlebars.SafeString(JSON.stringify(e));
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

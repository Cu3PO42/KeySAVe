/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>

(() => {
@component("pkm-list")
class PkmList extends polymer.Base {
    @property({type: Array})
    pokemon: any[];
}
createElement(PkmList);
})()

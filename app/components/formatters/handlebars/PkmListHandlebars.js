import * as React from "react";
import { Component } from "react";
import { Paper } from "material-ui";
import * as handlebars from "handlebars";
import * as pureRender from "pure-render-decorator";
import { Localization, Calculator as StatCalculator } from "keysavcore";
import styles from "./PkmListHandlebars.module.scss";

class PkmListHandlebars extends Component {
    static propTypes = {
        pokemon: React.PropTypes.array,
        language: React.PropTypes.string,
        format: React.PropTypes.string,
        filter: React.PropTypes.func
    };

    constructor(...args) {
        super(...args);
        const self = this;
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
                return Localization[self.props.language].species[this.species];
            },
            hasAlternateForm: function () {
                return !!Localization[self.props.language].forms[this.species];
            },
            formName: function () {
                return Localization[self.props.language].forms[this.species] ? Localization[self.props.language].forms[this.species][this.form] : "";
            },
            natureName: function () {
                return Localization[self.props.language].natures[this.nature];
            },
            abilityName: function () {
                return Localization[self.props.language].abilities[this.ability];
            },
            typeName: function (typeId) {
                return Localization[self.props.language].types[typeId];
            },
            moveName: function (moveId) {
                return moveId ? Localization[self.props.language].moves[moveId] : "";
            },
            itemName: function (itemId) {
                return itemId ? Localization[self.props.language].items[itemId] : "";
            },
            ballName: function () {
                return Localization[self.props.language].getBallName(this.ball);
            },
            metLocationName: function () {
                return Localization[self.props.language].getLocation(this);
            },
            eggLocationName: function () {
                return Localization[self.props.language].getEggLocation(this);
            },
            ballImage: function (ball) {
                return "[](/" + Localization[self.props.language].items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")";
            },
            esv: function () {
                return ("0000" + this.esv).slice(-4);
            },
            tsv: function () {
                return ("0000" + this.tsv).slice(-4);
            },
            language: function () {
                return Localization[self.props.language].languageTags[this.otLang];
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
                return Localization[self.props.language].games[this.gameVersion];
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
                return Localization[self.props.language].regions[this.gameVersion];
            },
            countryName: function () {
                return Localization[self.props.language].countries[this.countryID];
            },
            ribbons: function () {
                return Localization[self.props.language].getRibbons(this);
            },
            toJson: function (e) {
                return new handlebars.SafeString(JSON.stringify(e));
            }
        };
    }

    render() {
        const template = handlebars.compile(this.props.format);
        return (
            <Paper className={styles.paper}>
                {this.props.pokemon.filter(this.props.filter).map(pkm => <div key={pkm.box * 30 + pkm.slot} dangerouslySetInnerHTML={{ __html: template(pkm, { helpers: this.handlebarsHelpers }) }}></div>)}
            </Paper>
        );
    }
};

export default PkmListHandlebars;

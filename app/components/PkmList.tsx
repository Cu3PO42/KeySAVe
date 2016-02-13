import * as React from "react";
import { Component } from "react";
import { Paper } from "material-ui";
import * as handlebars from "handlebars";
import { Pkx, Localization, Calculator as StatCalculator } from "keysavcore";
import PkmListHandlebars from "./formatters/handlebars/PkmListHandlebars";
const styles = require("./PkmList.module.scss");

interface PkmListProps {
    pokemon: Pkx[];
    filter: (pkm) => boolean;
}

export default class PkmList extends Component<PkmListProps, {}> {
    static propTypes: React.ValidationMap<any> = {
        pokemon: React.PropTypes.array
    }

    render() {
        const format = "B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]";
        return (
            <div className={styles.listContainer}>
                <PkmListHandlebars format={format} pokemon={this.props.pokemon} filter={this.props.filter} language="en" />
            </div>
        );
    }
}

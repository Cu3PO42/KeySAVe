import * as React from "react";
import { Component } from "react";
import { Store } from "redux";
import { Paper } from "material-ui";
import * as handlebars from "handlebars";
import { Pkx, Localization, Calculator as StatCalculator } from "keysavcore";
import PkmListHandlebars from "./formatters/handlebars/PkmListHandlebars";
const styles = require("./PkmList.module.scss");

interface PkmListProps {
    pokemon: Pkx[];
    filter: (pkm) => boolean;
}

interface PkmListState {
    language?: string;
}

export default class PkmList extends Component<PkmListProps, PkmListState> {
    static contextTypes = {
        store: React.PropTypes.object
    };

    context: { store: Store };
    unsubscribe: Function;

    state = {
        language: "en"
    }

    componentWillMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.updateState());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    updateState() {
        this.setState({language: this.context.store.getState().format.language});
    }

    static propTypes: React.ValidationMap<any> = {
        pokemon: React.PropTypes.array
    }

    render() {
        const format = "B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]";
        return (
            <div className={styles.listContainer}>
                <PkmListHandlebars
                    format={format}
                    pokemon={this.props.pokemon}
                    filter={this.props.filter}
                    language={this.state.language} />
            </div>
        );
    }
}

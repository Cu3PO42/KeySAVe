import * as React from 'react';
import { Component } from 'react';
import PkmListHandlebars from './formatters/handlebars/PkmListHandlebars';
import styles from './PkmList.module.scss';

export default class PkmList extends Component {
  static propTypes = {
    pokemon: React.PropTypes.array,
    filter: React.PropTypes.func
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  state = {
    language: 'en'
  };

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateState() {
    this.setState({ language: this.context.store.getState().format.language });
  }

  render() {
    const format = 'bla B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]';
    return (
      <div className={styles.listContainer}>
        <PkmListHandlebars format={format} pokemon={this.props.pokemon} filter={this.props.filter} language={this.state.language}/>
      </div>
    );
  }
}

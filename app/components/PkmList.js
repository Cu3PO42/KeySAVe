import * as React from 'react';
import { Component } from 'react';
import styles from './PkmList.module.scss';

export default class PkmList extends Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    language: React.PropTypes.string,
    format: React.PropTypes.object,
    plugin: React.PropTypes.object
  };

  render() {
    const { language, format } = this.props;
    const { FormatPlugin } = this.props.plugin;
    return (
      <div className={styles.listContainer}>
        <FormatPlugin format={format} pokemon={this.props.pokemon} language={language} />
      </div>
    );
  }
}

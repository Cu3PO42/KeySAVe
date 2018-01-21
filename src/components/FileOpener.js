import PropTypes from 'prop-types';
import React from 'react';
import { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from './FileOpener.module.scss';

const inputStyle = {
  color: 'black',
};

export default class FileOpener extends Component {
  static propTypes = {
    file: PropTypes.object,
    fileOpened: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    inputText: PropTypes.string,
    options: PropTypes.object,
  };

  handleFileSelected = () => {
    const input = this.refs.selector;
    if (input.files && input.files[0]) this.props.fileOpened(input.files);
  };

  handleClick = () => {
    setTimeout(() => this.refs.selector.click(), 500);
  };

  render() {
    return (
      <div className={styles.flexHorizontal}>
        <input
          type="file"
          ref="selector"
          id={this.inputId}
          onChange={this.handleFileSelected}
          className={styles.selector}
        />
        <div className={styles.padRight}>
          <FlatButton
            label={this.props.buttonText || 'Open File'}
            onClick={this.handleClick}
            className={styles.button}
          />
        </div>
        <TextField
          floatingLabelText={this.props.inputText || 'File'}
          value={this.props.file && this.props.file[0] ? this.props.file[0].name : ''}
          disabled
          inputStyle={inputStyle}
          fullWidth
        />
      </div>
    );
  }
}

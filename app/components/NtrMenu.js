import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './NtrMenu.module.scss';

export default class NtrMenu extends React.Component {
  static propTypes = {
    menuOpen: React.PropTypes.bool.isRequired,
    ip: React.PropTypes.string.isRequired,
    client: React.PropTypes.object,

    openNtrMenu: React.PropTypes.func.isRequired,
    setNtrIp: React.PropTypes.func.isRequired,
    ntrConnect: React.PropTypes.func.isRequired,
    ntrDisconnect: React.PropTypes.func.isRequired,
    ntrDumpBoxes: React.PropTypes.func.isRequired,
    ntrDumpTrade: React.PropTypes.func.isRequired
  };

  openMenu = () => this.props.openNtrMenu(true)
  closeMenu = () => this.props.openNtrMenu(false)
  ipChanged = (e) => this.props.setNtrIp(e.target.value)
  connect = () => this.props.client === null ? this.props.ntrConnect(this.props.ip) : this.props.ntrDisconnect()

  dumpBoxes = () => this.props.ntrDumpBoxes(this.props.client);
  dumpTrade = () => this.props.ntrDumpTrade(this.props.client);

  render() {
    return (
      <div>
        <FlatButton label="ntr" onClick={this.openMenu} />
        <Dialog open={this.props.menuOpen} onRequestClose={this.closeMenu}>
          <h2>NTR Configuration</h2>
          <div className={styles.connectLine}>
            <TextField
              value={this.props.ip}
              onChange={this.ipChanged}
              floatingLabelText="3DS IP"
              errorText={this.props.ip !== '' && !/^(?:[01]?\d{1,2}\.|2(?:[0-4]\d|5[0-5])\.){3}(?:[01]?\d{1,2}|2(?:[0-4]\d|5[0-5]))$/.test(this.props.ip) ? 'This is not a valid IPv4 address.' : undefined}
              disabled={this.props.client !== null}
            />
            <RaisedButton primary label={this.props.client === null ? 'Connect' : 'Disconnect'} onClick={this.connect} />
          </div>
          <FlatButton label="Dump Boxes" onClick={this.dumpBoxes} />
          <FlatButton label="Dump Trade" onClick={this.dumpTrade} />
        </Dialog>
      </div>
    );
  }
}

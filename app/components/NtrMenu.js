import PropTypes from 'prop-types';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './NtrMenu.module.scss';
import CupIcon from './CupIcon';
import IconButton from 'material-ui/IconButton';

export default class NtrMenu extends React.Component {
  static propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    ip: PropTypes.string.isRequired,
    client: PropTypes.object,
    inProgress: PropTypes.string.isRequired,
    connectionError: PropTypes.bool.isRequired,
    tradeOffsetError: PropTypes.bool.isRequired,

    openNtrMenu: PropTypes.func.isRequired,
    setNtrIp: PropTypes.func.isRequired,
    ntrConnect: PropTypes.func.isRequired,
    ntrDisconnect: PropTypes.func.isRequired,
    ntrDumpBoxes: PropTypes.func.isRequired,
    ntrDumpBattleBox: PropTypes.func.isRequired,
    ntrDumpTrade: PropTypes.func.isRequired,
    ntrCancelInProgress: PropTypes.func.isRequired
  };

  openMenu = () => this.props.openNtrMenu(true)
  closeMenu = () => this.props.openNtrMenu(false)
  ipChanged = (e) => this.props.setNtrIp(e.target.value)
  connect = () => this.props.client === null ? this.props.ntrConnect(this.props.ip) : this.props.ntrDisconnect()

  dumpBoxes = () => this.props.ntrDumpBoxes(this.props.client);
  dumpBattleBox = () => this.props.ntrDumpBattleBox(this.props.client);
  dumpTrade = () => this.props.ntrDumpTrade(this.props.client);
  cancelTradeDump = () => this.props.ntrCancelInProgress();

  render() {
    return (
      <div>
        <IconButton onClick={this.openMenu}>
          <CupIcon />
        </IconButton>
        <Dialog open={this.props.menuOpen} onRequestClose={this.closeMenu}>
          <h2>TEA Configuration</h2>
          <div className={styles.connectLine}>
            <div className={styles.textFieldWrapper}>
              <TextField
                value={this.props.ip}
                onChange={this.ipChanged}
                floatingLabelText="3DS IP"
                errorText={this.props.ip !== '' && !/^(?:[01]?\d{1,2}\.|2(?:[0-4]\d|5[0-5])\.){3}(?:[01]?\d{1,2}|2(?:[0-4]\d|5[0-5]))$/.test(this.props.ip) ? 'This is not a valid IPv4 address.' : (this.props.connectionError ? 'There was an error connecting.' : undefined)}
                disabled={this.props.client !== null}
              />
            </div>
            <RaisedButton primary label={this.props.client === null ? 'Connect' : 'Disconnect'} onClick={this.connect} />
          </div>
          <div className={styles.buttons}>
            <div>
              <div>
                <FlatButton label="Dump Boxes" disabled={this.props.client === null || this.props.inProgress !== ''} onClick={this.dumpBoxes} />
              </div>
            </div>
            <div>
              <div>
                <FlatButton label="Dump Battle Box" disabled={this.props.client === null || this.props.inProgress !== ''} onClick={this.dumpBattleBox} />
              </div>
            </div>
            <div>
              <div>
                <FlatButton label="Dump Trade" disabled={this.props.client === null || this.props.inProgress !== ''} onClick={this.dumpTrade} />
                {this.props.tradeOffsetError ? <span styles={{ color: 'red' }}>Could not locate trade offset.</span> : null}
              </div>
              <div>
                <FlatButton label="Cancel Trade Dump" disabled={this.props.client === null || this.props.inProgress !== 'trade'} onClick={this.cancelTradeDump} />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

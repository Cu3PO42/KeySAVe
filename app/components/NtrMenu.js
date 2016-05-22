import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import styles from './NtrMenu.module.scss';

export default class NtrMenu extends React.Component {
  static propTypes = {
    menuOpen: React.PropTypes.bool.isRequired,
    ip: React.PropTypes.string.isRequired,
    game: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    client: React.PropTypes.object,

    openNtrMenu: React.PropTypes.func.isRequired,
    setNtrIp: React.PropTypes.func.isRequired,
    setNtrGame: React.PropTypes.func.isRequired,
    setNtrRegion: React.PropTypes.func.isRequired,
    ntrConnect: React.PropTypes.func.isRequired,
    ntrDisconnect: React.PropTypes.func.isRequired,
    ntrDumpBoxes: React.PropTypes.func.isRequired,
    ntrDumpTrade: React.PropTypes.func.isRequired
  };

  openMenu = () => this.props.openNtrMenu(true)
  closeMenu = () => this.props.openNtrMenu(false)
  ipChanged = (e) => this.props.setNtrIp(e.target.value)
  setGame = (e, i, v) => this.props.setNtrGame(v)
  setRegion = (e, i, v) => this.props.setNtrRegion(v)
  connect = () => this.props.client === null ? this.props.ntrConnect(this.props.ip) : this.props.ntrDisconnect()

  dumpBoxes = () => this.props.ntrDumpBoxes(this.props.client, this.props.game, this.props.region);
  dumpTrade = () => this.props.ntrDumpTrade(this.props.client, this.props.game, this.props.region);

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
            <DropDownMenu value={this.props.region} onChange={this.setRegion} disabled={this.props.client !== null}>
              <MenuItem value="pal" primaryText="PAL" />
              <MenuItem value="na" primaryText="NA" />
              <MenuItem value="jpn" primaryText="JPN" />
            </DropDownMenu>
            <DropDownMenu value={this.props.game} onChange={this.setGame} disabled={this.props.client !== null}>
              <MenuItem value="xy" primaryText="X/Y" />
              <MenuItem value="oras" primaryText="ΩR/αS" />
            </DropDownMenu>
            <RaisedButton primary label={this.props.client === null ? 'Connect' : 'Disconnect'} onClick={this.connect} />
          </div>
          <FlatButton label="Dump Boxes" onClick={this.dumpBoxes} />
          <FlatButton label="Dump Trade" onClick={this.dumpTrade} />
        </Dialog>
      </div>
    );
  }
}

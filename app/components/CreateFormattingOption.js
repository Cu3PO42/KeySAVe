import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class CreateFormattingOption extends React.Component {
  static propTypes = {
    optionCreated: React.PropTypes.func,
    plugins: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state.currentPlugin = props.plugins.toList().get(0).name;
  }

  state = {
    dialogOpen: false,
    name: '',
    currentPlugin: undefined
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  }

  pluginSelected = (e, i, v) => {
    this.setState({ currentPlugin: v });
  }

  nameChanged = (e) => {
    this.setState({ name: e.target.value });
  }

  createOption = () => {
    this.props.optionCreated(this.state.name, this.state.currentPlugin);
    this.closeDialog();
  }

  closeDialog = () => {
    this.setState({ name: '', dialogOpen: false });
  }

  render() {
    const plugins = this.props.plugins.valueSeq();
    return (
      <span>
        <Dialog
          open={this.state.dialogOpen}
          actions={[<FlatButton onClick={this.closeDialog}>Cancel</FlatButton>, <FlatButton onClick={this.createOption} primary>Create</FlatButton>]}
          onRequestClose={this.closeDialog}
        >
          <h3>Create a new formatting option</h3>
          <DropDownMenu floatingLabelText="Plugin" value={this.state.currentPlugin} onChange={this.pluginSelected}>
            {plugins.filter(({ multipleInstances: m }) => m).map(({ name }) => <MenuItem key={name} value={name} primaryText={name} />)}
          </DropDownMenu>
          <TextField floatingLabelText="Name" value={this.state.name} onChange={this.nameChanged} />
        </Dialog>
        <IconButton tooltip="Create formatting option" onClick={this.openDialog}><AddIcon /></IconButton>
      </span>
    );
  }
}

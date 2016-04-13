import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';

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
          <DropDownMenu value={this.state.currentPlugin} onChange={this.pluginSelected}>
            {plugins.filter(({ multipleInstances: m }) => m).map(({ name }) => <MenuItem key={name} value={name} primaryText={name} />)}
          </DropDownMenu>
          <TextField value={this.state.name} onChange={this.nameChanged} />
        </Dialog>
        <IconButton onClick={this.openDialog}><AddIcon /></IconButton>
      </span>
    );
  }
}

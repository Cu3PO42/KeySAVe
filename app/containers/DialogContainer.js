import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { closeDialog } from '../actions/dialog';

function mapStateToProps(state) {
  return {
    open: state.dialog.open,
    content: state.dialog.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: [
      <FlatButton primary label="Close" onTouchTap={() => dispatch(closeDialog())} />
    ]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(({ open, content, actions }) => (<Dialog open={open} actions={actions} modal >{content}</Dialog>));

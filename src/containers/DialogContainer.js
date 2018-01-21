import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { closeDialog } from '../actions/dialog';

const mapStateToProps = createSelector(
  state => state.dialog.open,
  state => state.dialog.message,
  (open, content) => ({ open, content })
);

function mapDispatchToProps(dispatch) {
  return {
    actions: [<FlatButton primary label="Close" onClick={() => dispatch(closeDialog())} />],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(({ open, content, actions }) => (
  <Dialog open={open} actions={actions} modal>
    {content}
  </Dialog>
));

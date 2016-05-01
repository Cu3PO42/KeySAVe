import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/updater';
import Updater from '../components/Updater';

const mapStateToProps = createSelector(
  state => state.updater,
  updater => updater
);

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Updater);

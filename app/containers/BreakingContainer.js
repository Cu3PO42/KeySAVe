import * as breakingActions from '../actions/breaking';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Breaking from '../components/Breaking';

const mapStateToProps = createSelector(
  state => state.breaking,
  breaking => breaking
);

const mapDispatchToProps = dispatch => bindActionCreators(breakingActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Breaking);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import * as actions from '../actions/filter';
import Filters from '../components/Filters';

const mapStateToProps = createSelector(
  state => state.filter,
  state => state.format.language,
  (filter, language) => ({ ...filter, language })
);

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

import * as formatActions from '../actions/format';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import FormattingOptions from '../components/FormattingOptions';

const mapStateToProps = createSelector(
  state => state.format,
  format => format
);

const mapDispatchToProps = dispatch => bindActionCreators(formatActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormattingOptions);

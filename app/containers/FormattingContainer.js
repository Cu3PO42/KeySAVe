import { changeFormatLanguage } from '../actions/format';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import FormattingOptions from '../components/FormattingOptions';

const mapStateToProps = createSelector(
  state => state.format,
  format => format
);

const mapDispatchToProps = dispatch => ({
  languageChanged: l => dispatch(changeFormatLanguage(l))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormattingOptions);

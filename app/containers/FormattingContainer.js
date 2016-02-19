import { changeFormatLanguage } from '../actions/format';
import { connect } from 'react-redux';
import FormattingOptions from '../components/FormattingOptions';

const mapStateToProps = state => ({
  language: state.format.language
});

const mapDispatchToProps = dispatch => ({
  languageChanged: l => dispatch(changeFormatLanguage(l))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormattingOptions);

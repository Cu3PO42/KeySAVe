import { changeFormatLanguage } from "../actions/format";
import { connect } from "react-redux";
import FormattingOptions from "../components/FormattingOptions";

const mapStateToProps = (state, ownProps) => ({
    language: state.format.language
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    languageChanged: l => dispatch(changeFormatLanguage(l))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormattingOptions);

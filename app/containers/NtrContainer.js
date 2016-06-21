import * as ntrActions from '../actions/ntr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NtrMenu from '../components/NtrMenu';

const mapStateToProps = state => state.ntr;
const mapDispatchToProps = dispatch => bindActionCreators(ntrActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NtrMenu);

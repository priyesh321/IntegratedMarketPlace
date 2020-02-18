import * as userActions from '../actions/user';
import Footer from '../components/footer/Footer';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    currentUser: userReducer.currentUser
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)

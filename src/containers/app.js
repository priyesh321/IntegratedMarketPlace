
import * as userActions from '../actions/user';
import App from '../App';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    currentUser: userReducer.currentUser,
    isLoggedIn: userReducer.isLoggedIn
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

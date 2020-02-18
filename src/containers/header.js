import * as userActions from '../actions/user';
import Header from '../components/header/Header';
import { connect } from 'react-redux';
import history from '../history';

export function mapStateToProps({ userReducer }) {
  return {
    currentUser: userReducer.currentUser,
    history: history
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    },
    onLogout: () => {
      return dispatch(userActions.onLogout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

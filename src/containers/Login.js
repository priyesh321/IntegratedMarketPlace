
import * as userActions from '../actions/user';
import Login from '../components/login/Login';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    error: userReducer.error,
    data: userReducer.data,
    isLoginOpen:userReducer.isLoginOpen
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onHandleLogin: (email, password) => {
      return dispatch(userActions.onLogin(email, password))
    },
    resetLoginState: () => {
      return dispatch(userActions.reset())
    },
    resetIsLoginOpen: () => {
      return dispatch(userActions.resetIsLoginOpen(false))
    },
    handleForgotPassword: () => {
      return dispatch(userActions.manageResetPassword(true))
    },
    handleOpenSignup: () => {
      return dispatch(userActions.manageSignupModal(true))
    },
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

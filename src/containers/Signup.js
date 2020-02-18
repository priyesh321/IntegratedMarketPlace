import * as userActions from '../actions/user';
import Signup from '../components/signup/signup';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    error: userReducer.error,
    success: userReducer.success,
    data: userReducer.data,
    isVerified: userReducer.isVerified,
    isOpenSignup: userReducer.isOpenSignup
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onHandleSignup: (data) => {
      return dispatch(userActions.onSignup(data))
    },
    resetSignupState: () => {
      return dispatch(userActions.reset())
    },
    handleOpenSignup: () => {
      return dispatch(userActions.manageSignupModal(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

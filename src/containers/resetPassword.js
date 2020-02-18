
import * as userActions from '../actions/user';
import ResetPassword from '../components/resetPassword/ResetPassword';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

export function mapStateToProps({ userReducer }) {
  return {
    error: userReducer.error,
    success: userReducer.success,
    data: userReducer.data,
    isOpenResetPassword:userReducer.isOpenResetPassword,
    resendOtpMsg: userReducer.resendOtpMsg,
    showMessage: userReducer.showMessage,
    resetPasswordSuccess: userReducer.resetPasswordSuccess
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleSendVerificationCode: (data) => {
      return dispatch(userActions.onResendOtp(data))
    },
    resetOtpMsg: () => {
      return dispatch(userActions.resetOtpMsg())
    },
    resetVerifyState: () => {
      return dispatch(userActions.reset())
    },
    handleForgotPassword: () => {
      return dispatch(userActions.manageResetPassword(false))
    },
    onHandleVerify: (data) => {
      return dispatch(userActions.onVerifyUser(data))
    },
    resendOtp: (data) => {
      return dispatch(userActions.onResendOtp(data));
    },
    handleResetPassword: (password, confirmPassword, data) => {
      return dispatch(userActions.onResetPassword(password, confirmPassword, data))
    },
    openLoginModal: () => {
      return dispatch(userActions.openLoginModal(true))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

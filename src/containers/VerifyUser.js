import * as userActions from '../actions/user';
import VerifyUser from '../components/verifyUser/VerifyUser';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    error: userReducer.error,
    success: userReducer.success,
    data: userReducer.data,
    isVerified: userReducer.isVerified,
    resendOtpMsg: userReducer.resendOtpMsg,
    showMessage: userReducer.showMessage
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onHandleVerify: (data) => {
      return dispatch(userActions.onVerifyUser(data))
    },
    resetVerifyState: () => {
      return dispatch(userActions.reset())
    },
    openLoginModal: () => {
      return dispatch(userActions.openLoginModal(true))
    },
    closeVerifyModal: () => {
      return dispatch(userActions.resetVerify(false))
    },
    resendOtp: (data) => {
      return dispatch(userActions.onResendOtp(data));
    },
    resetOtpMsg: () => {
      return dispatch(userActions.resetOtpMsg())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser)

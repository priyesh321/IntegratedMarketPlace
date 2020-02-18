import * as userActions from '../actions/user';
import UserProfile from '../components/userProfile/UserProfile';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    currentUser: userReducer.currentUser,
    userProfileData: userReducer.userProfileData,
    success: userReducer.success,
    personal_info_success: userReducer.personal_info_success,
    error: userReducer.error,
    contactUpdateMsg: userReducer.contactUpdateMsg,
    resetPasswordSuccess:userReducer.resetPasswordSuccess
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserProfileDate: () => {
      return dispatch(userActions.onGetUserProfileDate())
    },
    onUpdateUserProfile: (data, userId) => {
      return dispatch(userActions.onUpdateUserProfile(data, userId))
    },
    onResetError: () => {
      return dispatch(userActions.resetError())
    },
    sendOtp: (newContact,otpOption, contactType) => {
      return dispatch(userActions.sendOtpToUpdateContact(newContact,otpOption, contactType))
    },
    onHandleUpdateContactDetail: (newContact, otp, contactType) => {
      return dispatch(userActions.onUpdateContactDetail(newContact, otp, contactType))
    },
    handleResetPassword: (password, confirmPassword, data) => {
      return dispatch(userActions.onResetPassword(password, confirmPassword, data))
    },
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    },
    setUserProfileData: (data) => {
      return dispatch(userActions.setUserProfileData(data))
    },
    onResetPersonalInfoSuccess: () => {
      return dispatch(userActions.resetPersonalInfoSuccess())
    },
    onResetSuccess: () => {
      return dispatch(userActions.resetSuccess())
    },
    onResetContactUpdateMsg: () => {
      return dispatch(userActions.resetContactUpdateMsg())
    },
    onResetPasswordSuccess: () => {
      return dispatch(userActions.resetPasswordSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

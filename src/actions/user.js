export function onLogin(email, password) {
  return {
    email,
    password,
    type: 'ON_LOGIN'
  }
}

export function setLoginData(data) {
  return {
    data,
    type: 'SET_LOGIN_DATA'
  }
}

export function setErrorMessage(error) {
  return {
    error,
    type: 'SET_ERROR_MESSAGE'
  }
}

export function onSignup(data) {
  return {
    data,
    type: 'ON_SIGNUP'
  }
}

export function setSignupData({data, success, error}) {
  return {
    data,
    success,
    error,
    type: 'SET_SIGNUP_DATA'
  }
}

export function reset() {
  return {
    type: 'RESET_MESSAGE'
  }
}

export function onVerifyUser({ phoneNumber, email, otp }) {
  return {
    phoneNumber,
    email,
    otp,
    type: 'VERIFY_USER'
  }
}

export function setVerifyData({data, showMessage}) {
  return {
    data,
    showMessage,
    type: 'SET_VERIFY_DATA'
  }
}

export function openLoginModal(isLoginOpen) {
  return {
    isLoginOpen,
    type: 'OPEN_LOGIN_MODAL'
  }
}

export function resetVerify(isVerified) {
  return {
    isVerified,
    type: 'RESET_ISVERIFIED'
  }
}

export function resetIsLoginOpen(isLoginOpen) {
  return {
    isLoginOpen,
    type: 'CLOSE_LOGIN_MODAL'
  }
}

export function onResendOtp({ email, phoneNumber }) {
  return {
    email,
    phoneNumber,
    type: 'ON_RESEND_OTP'
  }
}

export function setResendOtpData(message) {
  return {
    message,
    type: 'SET_RESEND_OTP_DATA'
  } 
}

export function resetOtpMsg() {
  return {
    type: 'RESET_OTP_MSG'
  }
}

export function manageResetPassword(isOpenResetPassword) {
  return {
    isOpenResetPassword,
    type: 'MANAGE_RESET_PASSWORD_MODAL'
  }
}

export function onResetPassword(password, confirmPassword, data) {
  return {
    password,
    confirmPassword,
    data,
    type: 'ON_RESET_PASSWORD'
  }
}

export function setResetPasswordData(success) {
  return {
    success,
    type: 'SET_RESET_PASSWORD_DATA'
  } 
}

export function manageSignupModal(isOpenSignup) {
  return {
    isOpenSignup,
    type: 'MANAGE_SIGNUP_MODAL'
  }
}

export function onGetUserData() {
  return {
    type: 'GET_USER_DATA'
  }
}

export function setUserData(currentUser) {
  return {
    currentUser,
    type: 'SET_USER_DATA'
  }
}

export function onGetUserProfileDate() {
  return {
    type: 'GET_USER_PROFILE_DATA'
  }
}
export function setUserProfileData(userProfileData, success) {
  return {
    userProfileData,
    success,
    type: 'SET_USER_PROFILE_DATA'
  }
}
export function onUpdateUserProfile(data, userId) {
  return {
    data, 
    userId,
    type: 'ON_UPDATE_USER_PROFILE'
  }
}
export function sendOtpToUpdateContact(newContact,otpOption, contactType) {
  return {
    newContact,
    contactType,
    otpOption,
    type: 'SEND_OTP_TO_NEW_CONTACT'
  }
}
export function setSuccessMsg(success) {
  return {
    success,
    type: 'SET_SUCCESS_MSG'
  }
}
export function onUpdateContactDetail(newContact, otp, contactType) {
  return {
    newContact,
    otp,
    contactType,
    type: 'ON_UPDATE_CONTACT_DETAIL'
  }
}
export function onContactUpdated(contactUpdateMsg) {
  return {
    contactUpdateMsg,
    type: 'ON_UPDATE_CONTACT_SUCCESS'
  }
}
export function resetPersonalInfoSuccess() {
  return {
    type: 'RESET_PERSONAL_INFO_SUCCESS'
  }
}
export function resetError() {
  return {
    type: 'RESET_ERROR'
  }
}
export function resetSuccess() {
  return {
    type: 'RESET_SUCCESS'
  }
}
export function resetContactUpdateMsg() {
  return {
    type: 'RESET_CONTACT_UPDATE_MSG'
  }
}
export function resetPasswordSuccess() {
  return {
    type: 'RESET_PASSWORD_SUCCESS'
  }
}
export function onLogout() {
  return {
    type: 'ON_LOGOUT'
  }
}
export function getSellerData(sellerId) {
  return {
    sellerId,
    type: 'GET_SELLER_DATA'
  }
}
export function setSellerData(data) {
  return {
    data,
    type: 'SET_SELLER_DATA'
  }
}
export function onReportUser(data) {
  return {
    data,
    type: 'ON_REPORT_USER'
  }
}

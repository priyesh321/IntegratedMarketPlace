import * as userActions from '../actions/user';
import * as api from '../apis/user';
import { call, put, takeLatest } from 'redux-saga/effects';

function* onLogin(action) {
  try {
    const response = yield call(api.loginRequest, action)
    if (response.status === 200) {
      yield put(userActions.setLoginData(response.data));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
};

function* onSignup(action) {
  try {
    const response = yield call(api.signupRequest, action)
    if (response.status === 200) {
      yield put(userActions.setSignupData({data: response.data, success: 'User successfully signup', error: ''}));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
};

function* onVerifyUser(action) {
  try {
    const response = yield call(api.verifyUserRequest, action)
    if (response.status === 200) {
      yield put(userActions.setVerifyData({data: response.data.id, showMessage: 'User successfully verify'}));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* onResendOtp(action) {
  try {
    const response = yield call(api.resendOtpRequest, action)
    if (response.status === 200) {
      yield put(userActions.setResendOtpData(response.data));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* onResetPassword(action) {
  try {
    const response = yield call(api.resetPasswordRequest, action)
    if (response.status === 200) {
      yield put(userActions.setResetPasswordData(response.data));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}

function* onGetUserData(action) {
  try {
    const response = yield call(api.getUserDataRequest, action)
    if (response.status === 200) {
      yield put(userActions.setUserData(response.data));
    } else {
      yield put(userActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}

function* onGetUserProfileData(action) {
  try {
    const response = yield call(api.getUserProfileDataRequest, action)
    if(response.status === 200)
      yield put(userActions.setUserProfileData(response.data));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* onUpdateUserprofile(action) {
  try {
    const response = yield call(api.updateUserProfileDataRequest, action)
    if(response.status === 200)
      yield put(userActions.setUserProfileData(response.data,'Your profile updated successfully'));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}

function* sendOtpToNewContact(action) {
  try {
    const response = yield call(api.sendOtpToNewContactRequest, action)
    if(response.status === 200)
      yield put(userActions.setSuccessMsg(response.data));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}
function* onUpdateContactDetail(action) {
  try {
    const response = yield call(api.updateContactDetailRequest, action)
    if(response.status === 200)
      yield put(userActions.onContactUpdated(response.data));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}
function* getSellerData(action) {
  try {
    const response = yield call(api.getSellerDataRequest, action)
    if(response.status === 200)
      yield put(userActions.setSellerData(response.data));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}
function* onReportUser(action) {
  try {
    const response = yield call(api.reportUserRequest, action)
    if(response.status === 200)
      yield put(userActions.setSuccessMsg(response.data));
    else
      yield put(userActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(userActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}


export const userSaga = [
  takeLatest('ON_LOGIN', onLogin),
  takeLatest('ON_SIGNUP', onSignup),
  takeLatest('VERIFY_USER', onVerifyUser),
  takeLatest('ON_RESEND_OTP', onResendOtp),
  takeLatest('ON_RESET_PASSWORD', onResetPassword),
  takeLatest('GET_USER_DATA', onGetUserData),
  takeLatest('GET_USER_PROFILE_DATA', onGetUserProfileData),
  takeLatest('ON_UPDATE_USER_PROFILE', onUpdateUserprofile),
  takeLatest('SEND_OTP_TO_NEW_CONTACT', sendOtpToNewContact),
  takeLatest('ON_UPDATE_CONTACT_DETAIL', onUpdateContactDetail),
  takeLatest('GET_SELLER_DATA', getSellerData),
  takeLatest('ON_REPORT_USER', onReportUser),
];

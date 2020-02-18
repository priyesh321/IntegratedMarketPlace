import * as session from '../session';

const initState = {
  error: '',
  success: '',
  data: null,
  isVerified: false,
  isLoginOpen: false,
  resendOtpMsg:'',
  showMessage: '',
  isOpenResetPassword: false,
  resetPasswordSuccess: '',
  isOpenSignup: false,
  currentUser: '',
  userProfileData: '',
  personal_info_success: '',
  isLoggedIn: (session.isSessionValid()) ? session.isSessionValid(): false,
  sellerData: null
}

export function userReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: action.error || '' }
    case 'SET_LOGIN_DATA':
      return { ...state, data: action.data || null, isLoggedIn: true, isLoginOpen: false }
    case 'SET_SIGNUP_DATA': 
      return { ...state, isVerified:true, data: action.data, success: action.success || '', error: '', isOpenSignup: false }
    case 'RESET_MESSAGE':
      return { ...state, success: '', error: ''}
    case 'SET_VERIFY_DATA':
      return { ...state, showMessage: action.showMessage, resendOtpMsg:'', error: '', data: action.data}
    case 'OPEN_LOGIN_MODAL':
      return { ...state, success: '', error: '', isLoginOpen: action.isLoginOpen}
    case 'RESET_ISVERIFIED':
      return { ...state, success: '', error: '', isVerified: action.isVerified, data: null}
    case 'CLOSE_LOGIN_MODAL':
      return { ...state, success: '', error: '', isLoginOpen: action.isLoginOpen}
    case 'SET_RESEND_OTP_DATA':
      return { ...state, success: '', error: '', resendOtpMsg: action.message}
    case 'RESET_OTP_MSG':
      return { ...state, resendOtpMsg: ''}
    case 'MANAGE_RESET_PASSWORD_MODAL':
      return { ...state, isOpenResetPassword: action.isOpenResetPassword, error: '', resetPasswordSuccess: '' }
    case 'SET_RESET_PASSWORD_DATA':
      return { ...state, resetPasswordSuccess: action.success, showMessage: '', resendOtpMsg: '', error: '', }
    case 'MANAGE_SIGNUP_MODAL':
      return { ...state, isOpenSignup: action.isOpenSignup, error: '', }
    case 'SET_USER_DATA':
      return { ...state, currentUser: action.currentUser }
    case 'SET_USER_PROFILE_DATA':
      return { ...state, userProfileData: action.userProfileData, personal_info_success: action.success }
    case 'SET_SUCCESS_MSG':
      return { ...state, success:action.success }
    case 'ON_UPDATE_CONTACT_SUCCESS':
      return { ...state, contactUpdateMsg:action.contactUpdateMsg }
    case 'RESET_PERSONAL_INFO_SUCCESS':
      return { ...state, personal_info_success: '' }
    case 'RESET_ERROR':
      return { ...state, error: '' }
    case 'RESET_SUCCESS':
      return { ...state, success: '' }
    case 'RESET_CONTACT_UPDATE_MSG':
      return { ...state, contactUpdateMsg: '' }
    case 'RESET_PASSWORD_SUCCESS':
      return { ...state, resetPasswordSuccess: '' }
    case 'ON_LOGOUT': 
      return { ...state, data: null, isLoggedIn: false}
    case 'SET_SELLER_DATA':
      return { ...state, sellerData: action.data }
    default:
      return state
  }
}

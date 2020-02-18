import axios from 'axios';
import * as session from '../session';
const apiUrl = process.env.REACT_APP_API_URI;

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const loginRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/users/login", { email: data.email, password: data.password });
    const { token, expiry } = response.data;
    session.setSession(token, expiry);
  } catch (error) {
    response = { error: 'Invalid Email or Password.' };
  }
  return response;
};

export const signupRequest = async (userdata) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/users/register", { data: userdata.data });
    // const { token, expiry } = response.data;
    // session.setSession(token, expiry);
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
};

export const verifyUserRequest = async (data) => {
  let response;
  try {
    if(data.email) {
      response = await axios.post(apiUrl+"/api/users/verify", { email: data.email, otp: data.otp });  
    } else {
      response = await axios.post(apiUrl+"/api/users/verify", { phoneNumber: data.phoneNumber, otp: data.otp });
    }
    } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const resendOtpRequest = async (data) => {
  let response;
  try {
    if(data.email) {
      response = await axios.post(apiUrl+"/api/users/resendOtp", { email: data.email });
    } else {
      response = await axios.post(apiUrl+"/api/users/resendOtp", { phoneNumber: data.phoneNumber });
    }
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const resetPasswordRequest = async (data) => {
  let response;
  try {
    response = await axios.put(apiUrl+"/api/users/"+data.data+"/account", { password: data.password, confirmPassword: data.confirmPassword });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getUserDataRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl+"/api/users/profile", { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getUserProfileDataRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl+"/api/users/getUserProfile", { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const updateUserProfileDataRequest = async (data) => {
  let response;
  const userData = data.data;
  try {
    response = await axios.put(apiUrl+"/api/users/"+data.userId, userData, {headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const sendOtpToNewContactRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/users/sendOtpToUpdateContact", data, {headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const updateContactDetailRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/users/updateContactDetail", data, {headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const getSellerDataRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl+"/api/users/"+data.sellerId, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const reportUserRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/users/reportUser", data.data, {headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}


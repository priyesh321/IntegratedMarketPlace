import axios from 'axios';
import * as session from '../session';
const apiUrl = process.env.REACT_APP_API_URI;
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';

export const getCategoriesRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/categories", { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const createListingRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl + "/api/images/create-listing", data.data, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getListingRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/" + data.listingId, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const makeFeatureListingRequest = async (data) => {
  let response;
  try {
    response = await axios.put(apiUrl + "/api/service-listing/" + data.listingId, data.data, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getFeaturedListingRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/getFeatured");
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const getListedServicesRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/get_listed_services");
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const getMonthTrendingRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/get_trending_listings");
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const getMyListingRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/get_service_of_user/" + data.userId, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const editListingRequest = async (data) => {
  let response;
  try {
    response = await axios.put(apiUrl + "/api/images/edit-listing/" + data.listingId, data.data, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const deleteListingRequest = async (data) => {
  let response;
  try {
    response = await axios.delete(apiUrl + "/api/service-listing/" + data.listingId, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}
export const getSellerListingRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-listing/get_service_of_user/" + data.listingId);
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const setPageViewsRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl + "/api/service-view", data, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getServiceViewsRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl + "/api/service-view", { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const getFeaturedListByCategory = async (data) => {
  let response;
  try{
    response = await axios.get(apiUrl + "/api/service-listing/allFeatured");
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}


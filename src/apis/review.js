import axios from 'axios';
import * as session from '../session';
const apiUrl = process.env.REACT_APP_API_URI;

export const getReviewsRequest = async (data) => {
  let response;
  try {
    response = await axios.get(apiUrl+"/api/review/"+data.listingId, { headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}

export const createReviewRequest = async (data) => {
  let response;
  try {
    response = await axios.post(apiUrl+"/api/review", data.data ,{ headers: session.getAuthHeaders() });
  } catch (error) {
    response = { error: error.response.data };
  }
  return response;
}


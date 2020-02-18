import * as reviewActions from '../actions/review';
import * as api from '../apis/review';
import { call, put, takeLatest } from 'redux-saga/effects';


function* saveReview(action) {
  try {
    const response = yield call(api.createReviewRequest, action)
    if(response.status === 200)
      yield put(reviewActions.setSuccessMsg(response.data));
    else
      yield put(reviewActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(reviewActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}
function* getReviewData(action) {
  try {
    const response = yield call(api.getReviewsRequest, action)
    if(response.status === 200)
      yield put(reviewActions.setReviewsData(response.data));
    else
      yield put(reviewActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(reviewActions.setErrorMessage('Something went wrong.. Please try again later'));
  } 
}


export const reviewSaga = [
  takeLatest('ON_SAVE_REVIEW', saveReview),
  takeLatest('GET_REVIEW', getReviewData),
];

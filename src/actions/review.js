export function onSaveReview(data) {
  return {
    data,
    type: 'ON_SAVE_REVIEW'
  }
}

export function getReview(listingId) {
  return {
    listingId,
    type: 'GET_REVIEW'
  }
}

export function setErrorMessage(error) {
  return {
    error,
    type: 'SET_ERROR_MESSAGE'
  }
}
export function setSuccessMsg(success) {
  return {
    success,
    type: 'SET_SUCCESS_MSG'
  }
}
export function resetSuccessMsg() {
  return {
    type: 'RESET_SUCCESS_MSG'
  }
}
export function setReviewsData(data) {
  return {
    data,
    type: 'SET_REVIEWS_DATA'
  }
}


import * as reviewActions from '../actions/review';
import Review from '../components/review/Review';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, reviewReducer }) {
  return {
    error: reviewReducer.error,
    success: reviewReducer.success,
    isLoggedIn:userReducer.isLoggedIn,
    currentUser: userReducer.currentUser,
    reviewsData: reviewReducer.reviewsData
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSaveReview: (data) => {
      return dispatch(reviewActions.onSaveReview(data))
    },
    onResetSuccess: () => {
      return dispatch(reviewActions.resetSuccessMsg())
    },
    getReviewData: (listingId) => {
      return dispatch(reviewActions.getReview(listingId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)

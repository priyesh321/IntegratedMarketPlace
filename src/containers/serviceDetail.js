import * as listingActions from '../actions/listing';
import * as reviewActions from '../actions/review';
import ServiceDetail from '../components/serviceDetail/ServiceDetail';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer, reviewReducer }) {
  return {
    isLoggedIn: userReducer.isLoggedIn,
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
    listingData: listingReducer.listingData,
    reviewsData: reviewReducer.reviewsData
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getListingData: (listingId) => {
      return dispatch(listingActions.getListingData(listingId))
    },
    getReviewsData: (listingId) => {
      return dispatch(reviewActions.getReview(listingId))
    },
    setPageViews: (listingId) => {
      return dispatch(listingActions.onPageViews(listingId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail)

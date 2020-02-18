import * as listingActions from '../actions/listing';
import MyListing from '../components/myListing/MyListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    myListing: listingReducer.myListingData,
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMyListingData: (userId) => {
      return dispatch(listingActions.getMyListingData(userId))
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    },
    deleteListing: (listingId) => {
      return dispatch(listingActions.deleteListing(listingId))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListing)

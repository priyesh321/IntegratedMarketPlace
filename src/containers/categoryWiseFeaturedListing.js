import * as userActions from '../actions/user';
import * as listingActions from '../actions/listing'
import { connect } from 'react-redux';
import CategoryHome from '../components/categoryWiseListing/CategoryHome'

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    success: listingReducer.success,
    error: listingReducer.error,
    currentUser: userReducer.currentUser,
    categoryListing:listingReducer.categoryListing,
    featuredListings: listingReducer.featuredListings,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getCateoryListing: () => {
      return dispatch(listingActions.getCateoryListing())
    },
    getFeaturedListingData: () => {
      return dispatch(listingActions.getFeaturedListingData())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    },
    onGetUserData: () => {
        return dispatch(userActions.onGetUserData())
    },
    onLogout: () => {
        return dispatch(userActions.onLogout());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHome)

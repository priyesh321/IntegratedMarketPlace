import * as listingActions from '../actions/listing';
import FeaturedListing from '../components/home/FeaturedListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    success: listingReducer.success,
    error: listingReducer.error,
    featuredListings: listingReducer.featuredListings,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getFeaturedListingData: () => {
      return dispatch(listingActions.getFeaturedListingData())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedListing)

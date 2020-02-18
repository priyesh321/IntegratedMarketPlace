import * as listingActions from '../actions/listing';
import SellerListing from '../components/sellerProfile/SellerListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
    sellerListing: listingReducer.sellerListing,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getSellerListing: (sellerId) => {
      return dispatch(listingActions.getSellerListing(sellerId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerListing)

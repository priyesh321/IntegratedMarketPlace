import * as listingActions from '../actions/listing';
import * as userActions from '../actions/user';
import SellerProfile from '../components/sellerProfile/SellerProfile';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    isLoggedIn: userReducer.isLoggedIn,
    success: listingReducer.success,
    error: listingReducer.error,
    sellerData: userReducer.sellerData,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getSellerData: (sellerId) => {
      return dispatch(userActions.getSellerData(sellerId))
    },
    getSellerListing: (sellerId) => {
      return dispatch(listingActions.getSellerListing(sellerId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile)

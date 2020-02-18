import * as listingActions from '../actions/listing';
import PremiumSubscription from '../components/premiumSubscription/PremiumSubscription';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PremiumSubscription)

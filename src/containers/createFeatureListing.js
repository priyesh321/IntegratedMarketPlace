import * as listingActions from '../actions/listing';
import CreateFeatureListing from '../components/createFeatureListing/CreateFeatureListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
    data: listingReducer.listingData,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getListingData: (listingId) => {
      return dispatch(listingActions.getListingData(listingId))
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    },
    onMakeFeatureListing: (serviceId, data) => {
      return dispatch(listingActions.onMakeFeatureListing(serviceId, data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeatureListing)

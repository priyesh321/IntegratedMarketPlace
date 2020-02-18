import * as listingActions from '../actions/listing';
import CreateListing from '../components/createListing/CreateListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
    categoriesData: listingReducer.categoriesData,
    files: listingReducer.files
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      return dispatch(listingActions.getCategories())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    },
    onHandleListingCreate: (data) => {
      return dispatch(listingActions.createListing(data))
    },
    resetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)

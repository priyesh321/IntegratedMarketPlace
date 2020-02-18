import * as listingActions from '../actions/listing';
import EditListing from '../components/editListing/EditListing';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    currentUser: userReducer.currentUser,
    success: listingReducer.success,
    error: listingReducer.error,
    categoriesData: listingReducer.categoriesData,
    files: listingReducer.files,
    listingData: listingReducer.listingData
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getListingData: (listingId) => {
      return dispatch(listingActions.getListingData(listingId))
    },
    getCategories: () => {
      return dispatch(listingActions.getCategories())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    },
    onHandleEditListing: (data, listingId) => {
      return dispatch(listingActions.editListing(data, listingId))
    },
    onSendUploadedFiles: (data) => {
      return dispatch(listingActions.sendUploadedFiles(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListing)

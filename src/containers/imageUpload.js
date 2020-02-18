import * as listingActions from '../actions/listing';
import ImageUpload from '../components/imageUpload/ImageUpload';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    success: listingReducer.success,
    error: listingReducer.error,
    files: listingReducer.files,
    currentUser: userReducer.currentUser
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSendUploadedFiles: (data) => {
      return dispatch(listingActions.sendUploadedFiles(data))
    },
    onSendUpdatedFiles: (data) => {
      return dispatch(listingActions.sendUpdatedFiles(data))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)

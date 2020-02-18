import * as listingActions from '../actions/listing';
import ListedServices from '../components/home/ListedServices';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    success: listingReducer.success,
    error: listingReducer.error,
    listedServices: listingReducer.listedServicesData,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getListedServicesData: () => {
      return dispatch(listingActions.getListedServicesData())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListedServices)

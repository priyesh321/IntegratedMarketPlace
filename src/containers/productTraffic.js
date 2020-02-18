import * as listingActions from '../actions/listing';
import ProductTraffic from '../components/productTraffic/productTraffic';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    views: listingReducer.serviceViews,
    listedServicesData: listingReducer.listedServicesData
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getServiceListingViewsData: () => {
      return dispatch(listingActions.getServiceListViewsData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTraffic)

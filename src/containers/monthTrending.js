import * as listingActions from '../actions/listing';
import MonthTrending from '../components/home/MonthTrending';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer, listingReducer }) {
  return {
    success: listingReducer.success,
    error: listingReducer.error,
    monthTrendingData: listingReducer.monthTrendingData,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMonthTrendingData: () => {
      return dispatch(listingActions.getMonthTrendingData())
    },
    onResetError: () => {
      return dispatch(listingActions.resetError())
    },
    onResetSuccess: () => {
      return dispatch(listingActions.resetSuccess())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthTrending)

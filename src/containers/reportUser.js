import * as userActions from '../actions/user';
import ReportUser from '../components/reportUser/ReportUser';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    error: userReducer.error,
    success: userReducer.success,
    isLoggedIn:userReducer.isLoggedIn,
    currentUser: userReducer.currentUser
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onReportUser: (data) => {
      return dispatch(userActions.onReportUser(data))
    },
    onResetSuccess: () => {
      return dispatch(userActions.resetSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportUser)

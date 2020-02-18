
import * as userActions from '../actions/user';
import Home from '../components/home/Home';
import { connect } from 'react-redux';

export function mapStateToProps({ userReducer }) {
  return {
    currentUser: userReducer.currentUser
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserData: () => {
      return dispatch(userActions.onGetUserData())
    },
    onLogout: () => {
      return dispatch(userActions.onLogout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

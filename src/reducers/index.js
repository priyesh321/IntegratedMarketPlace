import { userReducer } from './user';
import { listingReducer } from './listing';
import { reviewReducer } from './review';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  userReducer,
  listingReducer,
  reviewReducer
})

export default reducers;

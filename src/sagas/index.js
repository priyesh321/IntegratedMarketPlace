import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { listingSaga } from './listingSaga'
import { reviewSaga } from './reviewSaga'

export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...listingSaga,
    ...reviewSaga
  ])
}

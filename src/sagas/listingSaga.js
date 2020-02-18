import * as listingActions from '../actions/listing';
import * as api from '../apis/listing';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getCategories(action) {
  try {
    const response = yield call(api.getCategoriesRequest, action)
    if (response.status === 200)
      yield put(listingActions.onSetCategoryData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* createListing(action) {
  try {
    const response = yield call(api.createListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setSuccessMsg(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getSingleListing(action) {
  try {
    const response = yield call(api.getListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setListingData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* makeFeatureListing(action) {
  try {
    const response = yield call(api.makeFeatureListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setSuccessMsg(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getFeatureListing(action) {
  try {
    const response = yield call(api.getFeaturedListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setFeaturedListingData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getListedServices(action) {
  try {
    const response = yield call(api.getListedServicesRequest, action)
    if (response.status === 200)
      yield put(listingActions.setListedServiceData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getMyListing(action) {
  try {
    const response = yield call(api.getMyListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setMyListingData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error))
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}
function* getMonthTrending(action) {
  try {
    const response = yield call(api.getMonthTrendingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setMonthTrendingData(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* editListing(action) {
  try {
    const response = yield call(api.editListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setSuccessMsg(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}
function* deleteListing(action) {
  try {
    const response = yield call(api.deleteListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setSuccessMsg(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getSellerListing(action) {
  try {
    const response = yield call(api.getSellerListingRequest, action)
    if (response.status === 200)
      yield put(listingActions.setSellerListing(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* setPageViewServices(action) {
  try {
    const response = yield call(api.setPageViewsRequest, action)
    if (response.status === 200) {
      // yield put(listingActions.setSuccessMsg(response.data));
    } else {
      yield put(listingActions.setErrorMessage(response.error));
    }
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getServiceListViews(action) {
  try {
    const response = yield call(api.getServiceViewsRequest, action);
    if (response.status === 200)
      yield put(listingActions.setServiceListViews(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

function* getCategorywiseListing(action) {
  try {
    const response = yield call(api.getFeaturedListByCategory,action);
    if (response.status === 200)
    yield put(listingActions.setListingCategory(response.data));
    else
      yield put(listingActions.setErrorMessage(response.error));
  } catch (e) {
    yield put(listingActions.setErrorMessage('Something went wrong.. Please try again later'));
  }
}

export const listingSaga = [
  takeLatest('GET_CATEGORIES', getCategories),
  takeLatest('ON_CREATE_LISTING', createListing),
  takeLatest('GET_LISTING_DATA', getSingleListing),
  takeLatest('MAKE_FEATURE_LISTING', makeFeatureListing),
  takeLatest('GET_FEATURED_LISTING', getFeatureListing),
  takeLatest('GET_LISTED_SERVICES', getListedServices),
  takeLatest('GET_MONTH_TRENDING', getMonthTrending),
  takeLatest('GET_MY_LISTING', getMyListing),
  takeLatest('ON_EDIT_LISTING', editListing),
  takeLatest('ON_DELETE_LISTING', deleteListing),
  takeLatest('GET_SELLER_LISTING', getSellerListing),
  takeLatest('ON_PAGE_VIEWS', setPageViewServices),
  takeLatest('GET_SERVICE_LIST_VIEWS', getServiceListViews),
  takeLatest("GET_CATEGORY_LISTING",getCategorywiseListing)
];


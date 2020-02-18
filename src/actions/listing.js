export function reset() {
  return {
    type: 'RESET_MESSAGE'
  }
}
export function setSuccessMsg(success) {
  return {
    success,
    type: 'SET_SUCCESS_MSG'
  }
}
export function resetError() {
  return {
    type: 'RESET_ERROR'
  }
}
export function resetSuccess() {
  return {
    type: 'RESET_SUCCESS'
  }
}
export function setErrorMessage(error) {
  return {
    error,
    type: 'SET_ERROR_MESSAGE'
  }
}
export function getCategories() {
  return {
    type: 'GET_CATEGORIES'
  }
}
export function onSetCategoryData(categoriesData) {
  return {
    categoriesData,
    type: 'SET_CATEGORIES_DATA'
  }
}
export function createListing(data) {
  return {
    data,
    type: 'ON_CREATE_LISTING'
  }
}
export function sendUploadedFiles(files) {
  return {
    files,
    type: 'SEND_UPLOADED_FILES'
  }
}
export function getListingData(listingId) {
  return {
    listingId,
    type: 'GET_LISTING_DATA'
  }
}
export function setListingData(listingData) {
  return {
    listingData,
    type: 'SET_LISTING_DATA'
  }
}
export function onMakeFeatureListing(listingId, data) {
  return {
    listingId,
    data,
    type: 'MAKE_FEATURE_LISTING'
  }
}
export function getFeaturedListingData() {
  return {
    type: 'GET_FEATURED_LISTING'
  }
}
export function setFeaturedListingData(featuredListingData) {
  return {
    featuredListingData,
    type: 'SET_FEATURED_LISTING'
  }
}
export function getListedServicesData() {
  return {
    type: 'GET_LISTED_SERVICES'
  }
}
export function setListedServiceData(listedServicesData) {
  return {
    listedServicesData,
    type: 'SET_LISTED_SERVICES'
  }
}
export function getMonthTrendingData() {
  return {
    type: 'GET_MONTH_TRENDING'
  }
}
export function setMonthTrendingData(monthTrendingData) {
  return {
    monthTrendingData,
    type: 'SET_MONTH_TRENDING'
  }
}
export function getMyListingData(userId) {
  return {
    userId,
    type: 'GET_MY_LISTING'
  }
}
export function setMyListingData(myListingData) {
  return {
    myListingData,
    type: 'SET_MY_LISTING_DATA'
  }
}
export function editListing(data, listingId) {
  return {
    data,
    listingId,
    type: 'ON_EDIT_LISTING'
  }
}
export function deleteListing(listingId) {
  return {
    listingId,
    type: 'ON_DELETE_LISTING'
  }
}
export function getSellerListing(listingId) {
  return {
    listingId,
    type: 'GET_SELLER_LISTING'
  }
}
export function setSellerListing(data) {
  return {
    data,
    type: 'SET_SELLER_LISTING'
  }
}
export function onPageViews(listingId) {
  return {
    listingId,
    type: 'ON_PAGE_VIEWS'
  }
}

export function getServiceListViewsData() {
  return {
    type: 'GET_SERVICE_LIST_VIEWS'
  }
}

export function setServiceListViews(data) {
  return {
    data,
    type: 'SET_SERVICE_VIEWS_DATA'
  }
}
export function sendUpdatedFiles(files) {
  return {
    files,
    type: 'SEND_UPDATED_FILES'
  }
}
export function getCateoryListing(data) {
  return {
    data,
    type: 'GET_CATEGORY_LISTING'
  }
}
export function setListingCategory(categoryListingData) {
  return {
    categoryListingData,
    type: 'SET_CATEGORY_LISTING'
  }
}
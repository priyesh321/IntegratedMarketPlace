
const initState = {
  error: '',
  success: '',
  categoriesData: [],
  currentUser: '',
  files: [],
  featuredListings: {
    sliderData: [],
    ratings: []
  },
  serviceViews: [],
  listedServicesData: {
    sliderData: [],
    ratings: []
  },
  monthTrendingData: {
    sliderData: [],
    ratings: []
  },
  listingData: '',
  myListingData: [],
  sellerListing: [],
  categoryListing:[],
}

export function listingReducer(state = initState, action) {
  switch (action.type) {
    case 'RESET_MESSAGE':
      return { ...state, success: '', error: ''}
    case 'SET_USER_DATA':
      return { ...state, currentUser: action.currentUser }
    case 'SET_SUCCESS_MSG':
      return { ...state, success:action.success }
    case 'RESET_ERROR':
      return { ...state, error: '' }
    case 'RESET_SUCCESS':
      return { ...state, success: '' }
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: action.error || '' }
    case 'SET_CATEGORIES_DATA':
      return { ...state, categoriesData: action.categoriesData || [] }
    case 'SEND_UPLOADED_FILES':
      return { ...state, files: action.files || []}
    case 'SEND_UPDATED_FILES':
        return { ...state, files: action.files || []}
    case 'SET_LISTING_DATA':
      return { ...state, listingData: action.listingData || []}
    case 'SET_FEATURED_LISTING':
      return { ...state, featuredListings: { ...action.featuredListingData } || {} }
    case 'SET_LISTED_SERVICES':
      return { ...state, listedServicesData: { ...action.listedServicesData } || {} }
    case 'SET_MONTH_TRENDING':
      return { ...state, monthTrendingData: { ...action.monthTrendingData } || {} }      
    case 'SET_MY_LISTING_DATA':
      return { ...state, myListingData: action.myListingData || []}
    case 'SET_SELLER_LISTING':
      return { ...state, sellerListing: action.data || []}
    case 'SET_SERVICE_VIEWS_DATA':
      return { ...state, serviceViews: action.data.serviceViews || []}
    case  'SET_CATEGORY_LISTING':
      return { ...state, categoryListing:  action.categoryListingData  || {} }
    default:
      return state
  }
}

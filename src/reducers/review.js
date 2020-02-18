
const initState = {
  error: '',
  success: '',
  data: null,
  reviewsData: []
}

export function reviewReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: action.error || '' }
    case 'SET_REVIEW_DATA':
      return { ...state, data: action.data || null }
    case 'RESET_MESSAGE':
      return { ...state, success: '', error: ''}
    case 'SET_SUCCESS_MSG':
      return { ...state, success:action.success }
    case 'RESET_ERROR':
      return { ...state, error: '' }
    case 'RESET_SUCCESS_MSG':
      return { ...state, success: '' }
    case 'SET_REVIEWS_DATA': 
      return { ...state, reviewsData: action.data}
    default:
      return state
  }
}

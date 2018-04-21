const initialState = {
  favoriteProviders: [],
  searchedProviders: [],
  currentProvider: {},
}


const providers = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_PROVIDERS':
      return {
        ...state,
        favoriteProviders: action.providers[1],
        searchedProviders: action.providers[0],
      };
    case 'FETCH_PROVIDER':
      return {
        ...state,
        currentProvider: action.fetchProvider,
      };
    default:
      return state;
  }
}

export default providers;
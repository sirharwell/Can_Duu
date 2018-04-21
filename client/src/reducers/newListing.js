const newListing = (state = {}, action) => {
  switch(action.type) {
    case 'SET_NEW_LISTING':
      return action.newListing;
    default:
      return state;
  }
}
export default newListing;

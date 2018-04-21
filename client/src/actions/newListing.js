

export const setNewListing = (newListing) => {
  return (dispatch) => {
    dispatch({ type: 'SET_NEW_LISTING', newListing})
  }
}

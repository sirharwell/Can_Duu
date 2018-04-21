const navigate = (state = '', action) => {
  switch(action.type){
    case 'DELETE_NAV':
      return action.path;
    default:
      return state;
  }
}

export default navigate;

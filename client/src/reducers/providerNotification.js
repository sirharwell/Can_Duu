

const providerNotification = ( state = [], action ) => {
  switch (action.type) {
    case 'FETCH_WORK_NOTIFICATION':
      return action.notes;
    case 'DELETE_WORK_NOTIFICATION': {
      let notifications =  state.notifications.filter( l => l.id !== action.id )
      return { ...state, notifications }}
    default:
      return state;
  }
}


export default providerNotification;

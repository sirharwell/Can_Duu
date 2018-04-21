

const userNotification = ( state = [], action ) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATION':
      return action.notes;
    case 'DELETE_NOTIFICATION':
      let notes =  state.filter( l => l.id !== action.id )
      return notes;
    case 'READ':
      let notifications = state.map(n => {
        if (n.id === action.notice.id){
          n.viewed = true
          return n
        }
         return n
      });
        return notifications;
    default:
      return state;
  }
}


export default userNotification;

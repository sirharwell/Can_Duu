import axios from 'axios';

export const fetchWorkNotification = (id) => {
  return (dispatch) => {
    axios.get(`/api/provider_notifications?id=${id}`)
      .then( res => {
        dispatch({ type: 'FETCH_WORK_NOTIFICATION', notes: res.data})
      })
  }
}

export const updateNotification = (provider_notification) => {
  return (dispatch) => {
    axios.put(`/api/provider_notifications/${provider_notification.id}`, provider_notification)
    .then ( res => {
      dispatch({ type: 'UPDATE_WORK_NOTIFICATION', notification: res.data})
    })
    .catch( err => console.log(err))
  }

}

import axios from 'axios';

export const fetchNotification = (id) => {
  return (dispatch) => {
    axios.get(`/api/user_notifications?id=${id}`)
      .then( res => {
        dispatch({ type: 'FETCH_NOTIFICATION', notes: res.data})
      })
  }
}

export const updateNotification = (user_notification) => {
  return (dispatch) => {
    axios.put(`/api/user_notifications/${user_notification.id}`, user_notification)
    .then ( res => {
      dispatch({ type: 'UPDATE_NOTIFICATION', notification: res.data})
    })
    .catch( err => console.log(err))
  }}

  export const acceptBidRequest = (id, jobId, cb) => dispatch => {
      axios.post(`/api/accept_bid_request?id=${id}&job_id=${jobId}`)
        .then( res => {
          dispatch ({ type: "SET_FLASH", message: res.data, color: "green"})
          cb()
        })
        .catch(err => console.log(err))
  }

  export const bidNotification = (id, jobId, cb) => dispatch => {
      axios.post(`/api/bid_notification?id=${id}&job_id=${jobId}`)
        .then( res => {
          dispatch ({ type: "SET_FLASH", message: res.data, color: "green"})
          cb()
        })
        .catch(err => console.log(err))
  }

  export const rejectBidRequest = (id, jobId, cb) => dispatch => {
      axios.post(`/api/reject_bid_request?id=${id}&job_id=${jobId}`)
        .then( res => {
          dispatch ({ type: "SET_FLASH", message: res.data, color: "green"})
          cb()
        })
        .catch(err => console.log(err))
  }

  export const viewed = (id) => dispatch => {
      axios.put(`/api/notifications/${id}/viewed`)
        .then( res => {
          dispatch ({ type: "READ", notice: res.data})
        })
  }

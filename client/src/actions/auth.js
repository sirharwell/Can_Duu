import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { fetchNotification } from '../actions/userNotification';
import { fetchWorkNotification } from '../actions/providerNotification';

const login = user => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN', user });
    dispatch(getWorkerInfo(user.id))
    dispatch(fetchNotification(user.id))
  }
};

const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
  dispatch({ type: 'CLEAR_WORKER'})
};

export const registerUser = (email, password, passwordConfirmation, history) => {
  return dispatch => {
    axios.post('/api/auth', { email, password, password_confirmation: passwordConfirmation })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(login(user));
        dispatch(setHeaders(headers));
        history.push('/register/full');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.full_messages.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogout = history => {
  return dispatch => {
    axios.delete('/api/auth/sign_out')
      .then(res => {
        const { headers } = res;
        dispatch(logout());
        dispatch(setFlash('Logged out successfully!', 'green'));
        dispatch(setHeaders(headers));
        history.push('/login');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/auth/sign_in', { email, password })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(login(user));
        dispatch(setHeaders(headers));
        history.push('/');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const registerFullUser = (id, email, password, first_name, last_name, username, phone_number, security_question, security_answer, street, city, state, zip, image) => {
  return dispatch => {
    axios.put(`/api/profile_update`, {id, email, password, first_name, last_name, username, phone_number, security_question, security_answer, street, city, state, zip, image})
      .then(res => {
        let user = res.data
        dispatch(setHeaders(res.headers));
        dispatch({ type: 'LOGIN', user })
      })
      .catch(err => {
      })
  }
}

export const updateProfile = (id, email, first_name, last_name, username, phone_number, security_question, security_answer, street, city, state, zip, image, history) => {
  return dispatch => {
    let data = new FormData()
    data.append('image', image)
    axios.put(`/api/user_update?id=${id}&email=${email}&first_name=${first_name}&last_name=${last_name}&username=${username}&phone_number=${phone_number}&security_question=${security_question}&security_answer=${security_answer}&street=${street}&city=${city}&state=${state}&zip=${zip}`, data)
      .then(res => {
        let user = res.data
        dispatch(setHeaders(res.headers));
        dispatch({ type: 'LOGIN', user })
        if (history) {
          history.push('/');
        }
      })
      .catch(err => {
      })
  }
}

export const validateToken = (callBack = () => {}) => {
  return dispatch => {
    dispatch({ type: 'VALIDATE_TOKEN' });
    const headers = axios.defaults.headers.common;
    axios.get('/api/auth/validate_token', headers)
      .then(res => {
        const user = res.data.data;
        dispatch(login(user));
        dispatch(setHeaders(res.headers));
      })
      .catch(() => callBack());
  };
};

const getWorkerInfo = (id) => dispatch => {
    axios.get(`/api/user_worker_info?id=${id}`)
      .then( res => {
        dispatch({ type: 'WORKER_INFO', info: res.data });
        dispatch(fetchWorkNotification(res.data.id))
      })
      .catch(err => {
        console.log(err)
      })
}

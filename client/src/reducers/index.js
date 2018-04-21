import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import newListing from './newListing';
import providers from './providers'
import jobs from './jobs'
import provider from './provider';
import userNotification from './userNotification';
import providerNotification from './providerNotification';
import bids from './newbid';
import navigate from './navigate';

const rootReducer = combineReducers({
  user,
  flash,
  newListing,
  providers,
  jobs,
  provider,
  userNotification,
  providerNotification,
  navigate,
  bids,
});

export default rootReducer;

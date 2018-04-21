import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import JobFeed from './JobFeed';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import FetchUser from './FetchUser';
import ViewJob from './ViewJob';
import Profile from './Profile';
import WorkerProfile from './WorkerProfile';
import { Switch, Route } from 'react-router-dom';
import CreateJob from './CreateJob';
import NewListingProviders  from './NewListingProviders';
import UserNotification from './UserNotification';
import FetchProvider from './FetchProvider'
import RegisterFull from './RegisterFull';
import MyListings from './MyListings'
import { Divider } from 'semantic-ui-react'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path ='/createjob' component={CreateJob} />
            <Route exact path='/jobs' component={JobFeed} />
            <ProtectedRoute exact path='/profile' component={Profile} />
            <ProtectedRoute exact path='/workerprofile' component={WorkerProfile} />
            <ProtectedRoute exact path="/jobs/:id" component={ViewJob}/>
            <ProtectedRoute exact path="/user_notifications" component={UserNotification}/>
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <Route exact path='/register/full' component={RegisterFull} />
            <Route exact path='/jobfeed' component={JobFeed} />
            <Route exact path='/mylistings' component={MyListings} />
            <Route exact path='/provider_results' component={NewListingProviders} />
            <Route exact path='/api/workers/:id' component={FetchProvider} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;

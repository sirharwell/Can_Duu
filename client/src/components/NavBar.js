import React, { Component } from 'react';
import { Menu, Image, Button, Label, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';

class NavBar extends Component {
  state = {
    activeItem: this.props.location.pathname,
    notifications: this.props.user_notifications,
    unread: this.props.unread,
  }

  rightNavs = () => {
    const { user, dispatch, history, activeItem, unread} = this.props;

    if (user.id) {
      return (
          <Menu.Menu position='right'>
            <Menu.Item as='a' href="/user_notifications" active={activeItem === '/user_notifications'} >Notifications <Label>
              <Icon name='mail' /> {unread}
            </Label></Menu.Item>
            <Menu.Item as='a' href="/MyListings" active={activeItem === '/MyListings'} >My Listings</Menu.Item>
            <Menu.Item as='a' href="/Profile" active={activeItem === '/Profile'} >Profile</Menu.Item>
            <Menu.Item
              name='Logout'
              onClick={() => dispatch(handleLogout(history))}
            />
          </Menu.Menu>
      );
    }
    return (
        <Menu.Item position='right'>
          <Button as='a'  href="/login">Log in</Button>
          <Button as='a' color="blue" href="/register" style={{ marginLeft: '0.5em' }}>Sign Up</Button>
        </Menu.Item>

    );
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu
        fixed="top"
        stackable
        size='large'
        pointing
      >
        <Link to='/'>
          <Menu.Item>
            <Image size='mini' src='https://image.ibb.co/cMmewc/simple_logo.png' />
          </Menu.Item>
        </Link>
        <Menu.Item as='a' href="/" active={activeItem === '/'} >Home</Menu.Item>
        <Menu.Item as='a' href="/CreateJob" active={activeItem === '/CreateJob'}>I need...</Menu.Item>
        <Menu.Item as='a' href="/jobs" active={activeItem === '/jobs'}>Jobs</Menu.Item>
          { this.rightNavs() }
        </Menu>
    )
  }
}

const mapStateToProps = state => {
  let unreaduser = state.userNotification.filter(n => n.viewed === false).length
  let unreadwork = state.providerNotification.filter(p => p.viewed === false).length
  return { user: state.user, notifications: state.userNotification, unread: unreaduser + unreadwork };
};

export default withRouter(connect(mapStateToProps)(NavBar));

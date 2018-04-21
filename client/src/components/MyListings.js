import React, { Component } from 'react';
import {
  Divider,
  Header,
  Image,
  Container,
  Segment,
  Button,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getListings, setCurrentJob } from '../actions/jobs';
import { deleteNav } from '../actions/navigate';

const pageHeader = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '45px',
  fontWeight: '800',
  letterSpacing: '1px',
  lineHeight: 1,
  textShadow: '#EDEDED 3px 2px 0',
};

const nameStyle = {
  display: 'block',
  height: '55px',
  textAlign: 'center',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

class MyListings extends Component {

   componentDidMount() {
    const { user, dispatch, location } = this.props;
    dispatch(getListings(user.id))
    dispatch(deleteNav(location.pathname))

    }

    loadJob = (id) => {
      this.props.dispatch(setCurrentJob(id, this.navigate))
    }

    navigate = (id) => {
      this.props.history.push(`/jobs/${id}`)
    }

    render() {
      const { listings } = this.props;
      return (
        <Container>
          <Divider hidden />
          <Header as="h1" textAlign='center' style={pageHeader}>My Listings</Header>
          <Divider hidden />
          <Card.Group itemsPerRow={5}>
            {listings.map(j => {
              let photo = j.photos === null ? 'https://image.ibb.co/cMmewc/simple_logo.png' : j.photos
              return(
                <Card>
                  <Segment basic textAlign='center' >
                    <p style={nameStyle}>{j.name}</p>
                    <Image centered src={photo} style={{width: 180, height: 180}}/>
                    <br/>
                    <Button onClick={() => this.loadJob(j.id)}>
                      View This Job
                    </Button>
                  </Segment>
                </Card>
              )
            })}
          </Card.Group>
      </Container>
      )
    }

}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    listings: state.jobs.listings

  }
}
export default connect(mapStateToProps)(MyListings);

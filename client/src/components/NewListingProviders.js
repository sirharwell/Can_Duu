import React, { Component } from 'react';
import { Header, Button, Grid, Container, Divider, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Providers from './Providers';
import { addJob, setCurrentJob } from '../actions/jobs';
import { newBidRequest } from '../actions/newBid';
import { withRouter } from 'react-router-dom';

class NewListingProviders extends Component {

  state = {
    filters: {},
    showForm: false,
    view: '',
    providers: [],
 }

 loadJob = (id) => {
   this.props.dispatch(setCurrentJob(id, this.navigate))
 }

  navigate = (id) => {
    this.props.history.push(`/jobs/${id}`)
  }

  addToProviders = (id) => {
    this.setState({ providers: [...this.state.providers, id]})
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  sendRequests = (cb) => {
    this.postJob(cb)
  }

  postJob = (cb) => {
    const { job, user, dispatch } = this.props;
    let newJob = {...job, user_id: user.id}
    dispatch(addJob(newJob, cb))
  }

  selectedRequests = async (id) => {
    const { dispatch, history } = this.props;
    let data = {
      worker_ids: `${this.state.providers.join(',')}`,
      job_id: id,
    }
    await dispatch(newBidRequest(data))
    history.push(`/jobs/${id}`)
  }

  topFive = async (id) => {
    let topFiveProviders = []
    for (let i = 0; i < 5; i++) {
       topFiveProviders.push(this.props.others[i].id)
    }
    let data = {
      worker_ids: topFiveProviders.join(','),
      job_id: id
    }
    await this.props.dispatch(newBidRequest(data))
    this.props.history.push(`/jobs/${id}`)
 }

  render() {
    const { providers } = this.state;
    const { job } = this.props
    return (
      <Container>
        <Divider hidden />
        <Header as="h1" textAlign='center'>Job: {job.name}</Header>
        <Divider hidden />
        <Grid columns={3}>
          <Grid.Column width={3} textAlign='center'>
            <Button onClick={() => this.sendRequests(this.selectedRequests)}>
              Send to {providers.length} chosen providers
            </Button>
            <Divider hidden />
            <Button onClick={() => this.sendRequests(this.topFive)}>
              Request Top 5 matched
            </Button>
            <Divider hidden />
            <Button blue onClick={() => this.postJob(this.navigate)}>Post Job</Button>
            <Divider hidden />
            <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Select Favorite Providers</Header>
            <Item.Group style={{height: '70vh', overflowY: 'scroll'}}>
              { this.props.favorites.length > 0 ?
                <div>
                  {this.props.favorites.map( p => (
                    <Providers {...p[0]} addToProviders={this.addToProviders}/>
                  ))}
                </div>
                :
                <Header as="h3">You currently have no matched favorite providers</Header>
              }
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Select Matched Providers</Header>
            <Item.Group style={{height: '70vh', overflowY: 'scroll'}}>
              { this.props.others.length > 0 ?
                <div>
                  {this.props.others.map( p => (
                    <Providers {...p} addToProviders={this.addToProviders}/>
                  ))}
                </div>
                :
                <Header as="h3">You currently have no matched providers</Header>
              }
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      favorites: state.providers.favoriteProviders,
      others: state.providers.searchedProviders,
      job: state.newListing,
      user: state.user,
    }
  }

export default withRouter(connect(mapStateToProps)(NewListingProviders));

import React from 'react';
import { Form, Dropdown, Checkbox, Rating, Image, Container, Divider, Header, Segment } from 'semantic-ui-react'
import { setNewListing } from '../actions/newListing';
import { searchedProviders } from '../actions/providers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Dropzone from 'react-dropzone';
import { setFlash} from '../actions/flash';

const options = [
{ key: 'carpentry', text: 'Carpentry', value: 'carpentry' },
{ key: 'electrical', text: 'Electrical', value: 'electrical' },
{ key: 'lawncare', text: 'Lawn Care', value: 'lawncare' },
{ key: 'mechanic', text: 'Mechanic', value: 'mechanic' },
{ key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
]
const miles = [
{ key: '10', text: '10 Miles', value: '10' },
{ key: '20', text: '20 Miles', value: '20' },
{ key: '50', text: '50 Miles', value: '50' },
{ key: '100', text: '100 Miles', value: '100' },
]

const pageHeader = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '45px',
  fontWeight: '800',
  letterSpacing: '1px',
  lineHeight: 1,
  textShadow: '#EDEDED 3px 2px 0',
};

class CreateJob extends React.Component {
  state = {
    name: this.props.newListing.name,
    description: this.props.newListing.description,
    location: this.props.newListing.location,
    category: this.props.newListing.category,
    urgent: this.props.newListing.urgent,
    photos: this.props.newListing.photos,
    filters: {
      rating: 0,
      bbb_approved: false,
      insurance: false,
      distance: 10,
    },
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validations(this.listAndSearch)
  }

  listAndSearch = () => {
    let id = this.props.isLoggedIn ? this.props.user.id : false
    const { rating, bbb_approved, insurance, distance } = this.state.filters
    const { name, description, location, category, urgent, photos } = this.state
    const { dispatch, history, user, } = this.props;
    const newListing = { rating, bbb_approved, insurance, distance, name, description, location, category, urgent, photos, user_id: user.id}
    dispatch(setNewListing(newListing))
    dispatch(searchedProviders(this.state.category, id, JSON.stringify(this.state.filters) ))
    history.push('/provider_results')
  }

  onDrop = (photos) => {
    this.setState({...this.state, photos: photos[0] })
  }

  validations = (cb) => {
    if (this.state.category) {
      cb()
    } else {
      this.props.dispatch(setFlash('Category cannot be blank.', 'red'))
    }
  }

  render() {
    const { name, description, location, photos } = this.state
    return (
      <div style={{marginLeft: "300px", marginRight: "300px"}}>
      <Container >
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header textAlign="center" style={pageHeader}> Create A New Job </Header>
            <Divider hidden />
            <Segment>
              <Header textAlign="center"> Job Information </Header>
              <Form.Input
                name="name"
                required
                value={name}
                onChange={this.handleChange}
                label="Name"
              />
              <Form.TextArea
                name="description"
                required
                value={description}
                onChange={this.handleChange}
                label="Description"
              />
              <Form.Input
                name="location"
                required
                value={location}
                onChange={this.handleChange}
                label="Location"
              />
              <Dropdown
                placeholder='Select Category'
                required
                value={this.state.category}
                fluid
                selection
                options={options}
                onChange={(e, d) => this.setState({ category: d.value})}
              />
              <div>
                <br />
                <h3>Is this job urgent?</h3>
                <Checkbox
                  checked={this.state.urgent}
                  toggle
                  onChange={() => this.setState({ urgent: !this.state.urgent}) }
                />
              </div>
            </Segment>
            <Segment>
              <h3>Provider Requirements</h3>
              <div>
                <Checkbox
                  label="Has Insurance"
                  checked={this.state.filters.insurance}
                  onChange={() => this.setState({ filters: {...this.state.filters, insurance: !this.state.filters.insurance}})}
                />
                <p></p>
                <Checkbox
                  label='BBB Approved'
                  checked={this.state.filters.bbb_approved}
                  onChange={() => this.setState({ filters: {...this.state.filters, bbb_approved: !this.state.filters.bbb_approved}})}
                />

              </div>
              <h3>Desired Provider Rating</h3>
              <Rating
                icon='star'
                defaultRating={0}
                maxRating={5}
                onRate={(e, d) => this.setState({ filters: {...this.state.filters, rating: d.rating}})}
              />
              <br />
              <h3>Distance</h3>
               <Dropdown
                 placeholder='Select Miles'
                 fluid
                 selection
                 options={miles}
                 onChange={(e, d) => this.setState({ filters: {...this.state.filters, distance: d.value }})}
               />
               </Segment>
            <h2> Photos </h2>
            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
              >
                { photos && <Image src={photos.preview} /> }
              </Dropzone>
              <Divider hidden />
              <div inline style={{display: "flex", justifyContent: "center"}}>
            <Form.Button color="blue">Add Job</Form.Button>
            <Form.Button style={{justifyContent: "center"}} onClick={() => this.props.history.goBack()}>Cancel</Form.Button>
            </div>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let isLoggedIn = state.user.id ? true : false
  return {
    user: state.user,
    newListing: state.newListing,
    isLoggedIn,
  }
}

export default withRouter(connect(mapStateToProps)(CreateJob));

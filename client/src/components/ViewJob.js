import React from 'react';
import {requestToBid} from '../actions/newBid';
import { connect } from 'react-redux';
import {
  Divider,
  Header,
  Image,
  Container,
  Table,
  Form,
  Card,
  Checkbox,
  Dropdown,
  Button,
  Segment,
  Rating,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteListing, updateListing} from '../actions/jobs'
import Dropzone from 'react-dropzone';

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
class ViewJob extends React.Component {
  state = {
    editing: false,
    name: '',
    description: '',
    insurance: '',
    rating: '',
    bbb_approved: '',
    category: '',
    urgent: '',
    location: '',
    distance: '',
    photos: '',
  }

  onDrop = (photos) => {
    this.setState({...this.state, photos: photos[0] })
  }
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
    })
  }

  bidRequest = () => {
    const { job, provider, dispatch } = this.props;
    dispatch(requestToBid( provider.id, job.id, this.backToJobs))
  }

  backToJobs = () => {
    this.props.history.push("/jobs")
  }

  onDrop = (photos) => {
    this.setState({...this.state, photos: photos[0] })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
    })
  }

  componentDidMount() {
    const { name, description, insurance, rating, bbb_approved, category, urgent, location, distance, photos } = this.props.job
    this.setState({ name, description, insurance, rating, bbb_approved, category, urgent, location, distance, photos})
  }

  removeListing = (job) => {
    const { job: {id}, dispatch, history, nav } = this.props
    dispatch(deleteListing(id))
    history.push(nav)
  }

  editListing = () => {
    const { job: {id, user_id}, dispatch } = this.props
    const { name, description, insurance, bbb_approved, rating, category, urgent, location, distance, photos } = this.state
    dispatch(updateListing({ id, name, description, insurance, bbb_approved, rating, category, urgent, location, distance, photos, user_id }))
    this.toggleEdit()
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  editView = () => {
    const { name, description, insurance, bbb_approved, category, urgent, location, photos } = this.state
      return (
        <div style={{marginLeft: "300px", marginRight: "300px"}}>
          <Container >
            <Divider hidden />
            <Form>
              <Header textAlign="center"> Update </Header>
              <Segment>
                <Form.Input
                  name="name"
                  // required
                  value={name}
                  onChange={this.handleChange}
                  label="Job Name"
                />
                <Form.TextArea
                  name="description"
                  // required
                  value={description}
                  onChange={this.handleChange}
                  label="Description"
                />
                <Form.Input
                  name="location"
                  // required
                  value={location}
                  onChange={this.handleChange}
                  label="Location"
                />
                <Dropdown
                  placeholder='Category'
                  // required
                  value={category}
                  fluid
                  selection
                  options={options}
                  onChange={(e, d) => this.setState({ category: d.value})}
                />
                <Divider hidden />
                <Checkbox
                  checked={urgent}
                  toggle
                  label="Urgent"
                  onChange={() => this.setState({ urgent: !this.state.urgent}) }
                />
              </Segment>
                <Segment>
                  <h2>Provider Requirements</h2>
                  <br />
                  <p></p>
                  <Checkbox
                    label='Has Insurance'
                    checked={insurance}
                    onChange={() => this.setState({ insurance: !this.state.insurance })}
                  />
                  <br />
                  <p></p>
                  <Checkbox
                    label='BBB Approved'
                    checked={bbb_approved}
                    onChange={() => this.setState({ bbb_approved: !this.state.bbb_approved })}
                  />
                  <h3>Desired Provider Rating</h3>
                  <Rating
                    icon='star'
                    defaultRating={0}
                    maxRating={5}
                    onRate={(e, d) => this.setState({ rating: d.rating })}
                  />
                <h2>Distance</h2>
                  <Dropdown
                    placeholder='Select Miles'
                    fluid
                    selection
                    options={miles}
                    onChange={(e, d) => this.setState({ distance: d.value })}
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
                  <Form.Button color="blue" primary onClick={this.editListing}>Update</Form.Button>
                  <p style={{color: "white"}}> --- </p>
                  <Form.Button style={{justifyContent: "center"}} onClick={this.toggleEdit}>Cancel</Form.Button>
                </div>
            </Form>
          </Container>
        </div>
      )
    }

  profileView = () => {
    const { job, isMyJob }  = this.props;
    let photo = job.photos === null ? 'https://image.ibb.co/cMmewc/simple_logo.png' : job.photos
      return (
        <Container text textAlign="center">
          <Divider hidden />
          <div>
            <Header as="h1" textAlign="center">{job.name}</Header>
            <Image size="medium" src={photo} centered/>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    Job Name
                  </Table.Cell>
                  <Table.Cell>
                    {job.name}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Description
                  </Table.Cell>
                  <Table.Cell>
                    {job.description}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Location
                  </Table.Cell>
                  <Table.Cell>
                    {job.location}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Category
                  </Table.Cell>
                  <Table.Cell>
                    {job.category}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Urgent
                  </Table.Cell>
                  {job.urgent ?
                    <Table.Cell>
                      <p>Yes</p>
                    </Table.Cell>
                    :
                    <Table.Cell>
                      <p>No</p>
                    </Table.Cell>
                  }
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Minimum Rating
                  </Table.Cell>
                  {job.rating ?
                    <Table.Cell>
                      <Rating
                        icon='star'
                        defaultRating={job.rating}
                        maxRating={5}
                        disabled
                      />
                    </Table.Cell>
                    :
                    <Table.Cell>
                      <p>Any Rating</p>
                    </Table.Cell>
                  }
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Insured
                  </Table.Cell>
                    {job.insurance ?
                      <Table.Cell>
                        <p>Required</p>
                      </Table.Cell>
                      :
                      <Table.Cell>
                        <p>Not Required</p>
                      </Table.Cell>
                    }
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    BBB approval
                  </Table.Cell>
                  {job.bbb_approved ?
                    <Table.Cell>
                      <p>Required</p>
                    </Table.Cell>
                    :
                    <Table.Cell>
                      <p>Not Required</p>
                    </Table.Cell>
                  }
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    Distance
                  </Table.Cell>
                  <Table.Cell>
                    {job.distance}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
            <div>
              <Divider hidden />
                {isMyJob ?
                  <div>
                    <Divider hidden />
                    <Button blue onClick={this.toggleEdit} primary>Edit Listing</Button>
                    <Button onClick={this.removeListing}>Delete Listing</Button>
                  </div>
                  :
                    <div>
                    <Button blue primary onClick={() => this.bidRequest()}>Request to Bid</Button>
                    <Link to='../jobs'>
                      <Button>Go Back</Button>
                    </Link>
                    </div>

                }
            </div>
            <Divider hidden />
        </Container>
    )
  }

  render() {
    const { editing } = this.state;
    return (
      <div>
        { editing ? this.editView() : this.profileView() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let isMyJob = state.jobs.currentJob.user_id === state.user.id
  return { isMyJob, job: state.jobs.currentJob, provider: state.provider, nav: state.navigate }
}

export default connect(mapStateToProps)(ViewJob);

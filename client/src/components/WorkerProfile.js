import React from 'react';
import { Grid, Form, Image, Container, Button, Table, Divider, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { updateProvider } from '../actions/providers';
import { Link } from 'react-router-dom';

const pageHeader = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '45px',
  fontWeight: '800',
  letterSpacing: '1px',
  lineHeight: 1,
  textShadow: '#EDEDED 3px 2px 0',
};


class WorkerProfile extends React.Component {
  state = {
    editing: false,
    name: '',
    bio: '',
    category: '',
    phone_number: '',
    email: '',
    insured: false,
    bbb_approved: false,
    service_area: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    logo: '',
  }
  componentDidMount() {
    const { name, email, bio, category, insurance, service_area, phone_number, street, city, state, zip, logo } = this.props.info;
    this.setState({ name, email, bio, category, insurance, service_area, phone_number, street, city, state, zip, logo })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, bio, category, insurance, service_area, phone_number, street, city, state, zip, logo } = this.state;
    const { info: {id}, dispatch } = this.props;
    dispatch(updateProvider({ id, name, email, bio, category, insurance, service_area, phone_number, street, city, state, zip, logo}))
    this.setState({
      editing: false,
    })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
    })
  }
  profileView= () => {
    const { info } = this.props;
    const { editing } = this.state;
    let photo = info.logo === '' || null ? 'https://image.ibb.co/cMmewc/simple_logo.png' : info.logo
    return(
      <Container text textAlign="center">
        <Grid.Column width={4}>
          <Image size="medium" src={photo} centered/>
        </Grid.Column>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                Name
              </Table.Cell>
              <Table.Cell>
                  {info.name}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Bio
              </Table.Cell>
              <Table.Cell>
                  {info.bio}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Category
              </Table.Cell>
              <Table.Cell>
                  {info.category}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Phone Number
              </Table.Cell>
              <Table.Cell>
                  {info.phone_number}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Email
              </Table.Cell>
              <Table.Cell>
                  {info.email}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Insurance
              </Table.Cell>
              <Table.Cell>
                  {info.insurance ? 'Yes' : 'Not Provided'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                BBB Approved
              </Table.Cell>
              <Table.Cell>
                  {info.bbb_approved ? 'Yes' : 'Not Provided'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Service Area
              </Table.Cell>
              <Table.Cell>
                  {info.service_area}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Address
              </Table.Cell>
              <Table.Cell>
                  {info.street}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                City
              </Table.Cell>
              <Table.Cell>
                  {info.city}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                State
              </Table.Cell>
              <Table.Cell>
                  {info.state}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Zip
              </Table.Cell>
              <Table.Cell>
                  {info.zip}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button color="blue" onClick={this.toggleEdit}>{ editing ? 'Cancel' : 'Edit Profile' }</Button>
        <Link to='./Profile'>
         <Button> Back To Profile </Button>
        </Link>
        <Link to='./MyListings'>
          <Button>View My Listings</Button>
        </Link>
        <Divider hidden />
      </Container>
    )
   }

  onDrop = (logos) => {
   this.setState({
       logo: logos[0]
   })
 }
  editView = () => {
    const { name, email, category, bio, insurance, bbb_approved, service_area, phone_number, street, city, state, zip, logo } = this.state;
    return(
      <div style={{marginLeft: "100px", marginRight: "100px"}}>
        <Container>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                label="Name"
                name="name"
                value={name}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Phone Number"
                name="phone_number"
                value={phone_number}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Email"
                name="email"
                value={email}
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Input
              label="Bio"
              name="bio"
              value={bio}
              required
              onChange={this.handleChange}
            />
            <Form.Group widths="equal">
              <Form.Input
                label="Category"
                name="category"
                value={category}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Service Area"
                name="service_area"
                value={service_area}
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Input
              label="Address"
              name="street"
              value={street}
              required
              onChange={this.handleChange}
            />
            <Form.Group widths="equal">
              <Form.Input
                label="City"
                name="city"
                value={city}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="State"
                name="state"
                value={state}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Zip Code"
                name="zip"
                value={zip}
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Header as="h4" floated="left">Provider Image</Header>
            <Divider hidden />
            <Divider hidden />
            <Dropzone
              onDrop={this.onDrop}
              multiple={false}
            >
              { logo && <Image src={logo.preview} />}
            </Dropzone>
            <br />
            <Button primary onClick={this.editListing}>Update</Button>
            <Button onClick={this.toggleEdit}>Cancel</Button>
          </Form>
          <br />
          <Button onClick={() => console.log('hi')}>{insurance ? 'Update Insurance?' : 'Upload Proof of Insurance' }</Button>
          <Button onClick={() => console.log('hello')}>{bbb_approved ? 'Update BBB Approval' : 'Upload Proof of BBB Approval' }</Button>
          <Divider hidden />
        </Container>
      </div>
    )
  }

  render(){
    const {editing} = this.state;
    return (
      <Container textAlign="center">
        <h1 style={pageHeader}>Provider Profile</h1>
          { editing ? this.editView() : this.profileView() }
      </Container>
    )
  }
}

const mapStateToProps =(state) => {
  return { info: state.provider }
}

export default connect(mapStateToProps)(WorkerProfile);

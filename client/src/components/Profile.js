import React from 'react';
import { Grid, Form, Image, Container, Button, Table, Segment, Divider, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/auth';
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

class Profile extends React.Component {
  state = {
    editing: false,
    formValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      image: '',
      security_question: '',
      security_answer: '',

    },
  }

  componentDidMount() {
    const { user: { first_name, last_name, email, username, phone_number, street, city, state, zip, security_question, security_answer, image }} = this.props
    this.setState({ formValues: { first_name, last_name, email, username, phone_number, street, city, state, zip, security_question, security_answer, image } })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { first_name, last_name, email, username, phone_number, street, city, state, zip, security_question, security_answer, image}} = this.state;
    const { user, dispatch } = this.props;
    dispatch(updateProfile(user.id, email, first_name, last_name, username, phone_number, security_question, security_answer, street, city, state, zip, image, false))
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        image: ''
      }
    })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
    })
  }

  profileView= () => {
    const { user } = this.props;
    const { editing } = this.state;
    let photo = user.image === null ? 'https://image.ibb.co/cMmewc/simple_logo.png' : user.image
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
                  {user.first_name} {user.last_name}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Email
              </Table.Cell>
              <Table.Cell>
                  {user.email}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Username
              </Table.Cell>
              <Table.Cell>
                  {user.username}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Phone Number
              </Table.Cell>
              <Table.Cell>
                  {user.phone_number}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Address
              </Table.Cell>
              <Table.Cell>
                  {user.street}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                City
              </Table.Cell>
              <Table.Cell>
                  {user.city}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                State
              </Table.Cell>
              <Table.Cell>
                  {user.state}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Zip
              </Table.Cell>
              <Table.Cell>
                  {user.zip}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button color="blue" onClick={this.toggleEdit}>{ editing ? 'Cancel' : 'Edit Profile' }</Button>
          {this.props.isProvider &&
          <Link to='./WorkerProfile'>
            <Button> Provider Profile </Button>
          </Link>
          }
          <Link to='./MyListings'>
            <Button>View My Listings</Button>
          </Link>
        <Divider hidden />
      </Container>
     )
   }

   onDrop = (images) => {
   this.setState({
     formValues: {
       ...this.state.formValues,
       image: images[0]
      }
    })
    }

  editView = () => {
    const { formValues: { first_name, last_name, email, username, phone_number, street, city, state, zip, image, security_question,security_answer } } = this.state
    return(
      <div style={{marginLeft: "100px", marginRight: "100px"}}>
        <Container>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                name="first_name"
                value={first_name}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Last Name"
                name="last_name"
                value={last_name}
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
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                name="email"
                value={email}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="User Name"
                name="username"
                value={username}
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Security Question"
                name="security_question"
                value={security_question}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                label="Security Answer"
                name="security_answer"
                value={security_answer}
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
              { image && <Image src={image.preview} />}
            </Dropzone>
            <br />
            <Button primary onClick={this.editListing}>Update</Button>
            <Button onClick={this.toggleEdit}>Cancel</Button>
          </Form>
          <Divider hidden />
        </Container>
      </div>
    )
  }

  render(){
    const {editing} = this.state;
    return (
      <Container textAlign="center">
        <h1 style={pageHeader}>My Profile</h1>
        { editing ? this.editView() : this.profileView() }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  let isProvider = state.user.worker_profile
  return { user: state.user, isProvider }
}
export default connect(mapStateToProps)(Profile);

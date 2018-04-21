import React, { Component } from 'react';
import { Header, Form, Button, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerFullUser } from '../actions/auth';
import {
  validateFieldIsState,
  runValidations,
  validateFieldIsZip,
  validateFieldIsPhone,
} from '../actions/flash';
import { withRouter } from 'react-router-dom';

// this was a start. Still needs:
  // If users decide to use Omniauth we should already have some of their information,
   // so we may need to bring in that information from the store into this component.

   // The error messages aren't all displaying. Only the last one.
   // Error messages persist though the next page... that should be changed.
   // checking for the last field and will return that one if error even if it's for another input

   // The error messages aren't all displaying. Only the last one.
   // Error messages persist though the next page... that should be changed.

class Register extends Component {
  state = {
    id: this.props.user.id,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    username: this.props.user.username,
    phone_number: this.props.user.phone_number,
    security_question: this.props.user.security_question,
    security_answer: this.props.user.security_answer,
    street: this.props.user.street,
    city: this.props.user.city,
    state: this.props.user.state,
    zip: this.props.user.zip,
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      username,
      phone_number,
      security_question,
      security_answer,
      street,
      city,
      state,
      zip,
    } = this.state;
    const { user, dispatch } = this.props;
    let input =  `${state}`
    let z_ip = `${zip}`
    let phone = `${phone_number}`
    runValidations([
      dispatch(validateFieldIsState(
        {[input]: state},
      )),
      dispatch(validateFieldIsZip(
        {[z_ip]: zip},
      )),
      dispatch(validateFieldIsPhone(
        {[phone]: phone_number},
      ))
    ])
    dispatch(
      registerFullUser(
        user.id,
        user.email,
        user.password,
        first_name,
        last_name,
        username,
        phone_number,
        security_question,
        security_answer,
        street,
        city,
        state,
        zip,
      )
    );
    this.navigate();
  }

  navigate = () => {
    this.props.history.push('/')
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }


  render() {
    const {
      first_name,
      last_name,
      username,
      phone_number,
      security_question,
      security_answer,
      street,
      city,
      state,
      zip,
     } = this.state;

     return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Full Registration</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor='first_name'>First Name</label>
            <input
              id='first_name'
              placeholder='First Name'
              type='text'
              // required
              value={first_name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='last_name'>Last Name</label>
            <input
              id='last_name'
              placeholder='Last Name'
              type='text'
              // required
              value={last_name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              placeholder='biker_dude576'
              // required
              value={username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='phone_number'>Phone Number</label>
            <input
              id='phone_number'
              placeholder='555-555-5555'
              // required
              value={phone_number}
              onChange={this.handleChange}

            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='security_question'>Security Question</label>
            <input
              id='security_question'
              placeholder='What is my dogs name?'
              // required
              value={security_question}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='security_answer'>Security Answer</label>
            <input
              id='security_answer'
              placeholder='Bixby'
              // required
              value={security_answer}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='street'>Street Number</label>
            <input
              id='street'
              placeholder='123 Fake Street'
              // required
              value={street}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='city'>City</label>
            <input
              id='city'
              placeholder='Springfield'
              // required
              value={city}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='state'>State</label>
            <input
              id='state'
              placeholder='WI'
              // required
              value={state}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='zip'>Zip Code</label>
            <input
              id='zip'
              placeholder='97538'
              // required
              value={zip}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment basic textAlign='center'>
            <Button.Group size='large'>
              <Button onClick={() => this.handleSubmit } primary type='submit'>Continue Registration</Button>
            </Button.Group>
          </Segment>
          <Grid textAlign='center' relaxed columns={3}>
           </Grid>
        </Form>
      </Segment>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStoreToProps)(Register));

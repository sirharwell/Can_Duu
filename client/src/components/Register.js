import React, { Component } from 'react';
import { Header, Form, Button, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { setFlash } from '../actions/flash';
import { Link } from 'react-router-dom';


class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '' };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { dispatch, history } = this.props;
    if (password === passwordConfirmation) {
      dispatch(registerUser(email, password, passwordConfirmation, history));
    } else dispatch(setFlash('Passwords do not match!, please try again', 'red'));
  }

  handleChange = event => {
    // use e to grab the id off the element also the value and set state
    // const { id, value } = event.target;
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              placeholder='Email'
              required
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input
              id='passwordConfirmation'
              placeholder='Password Confirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment basic textAlign='center'>
            <Button.Group size='large'>
              <Button primary type='submit'>Register Now</Button>
              <Button.Or />
              <Link to='./login'>
                  <Button secondary> Log In </Button>
              </Link>
            </Button.Group>
            <Header as='h5' textAlign='center'>Or</Header>
          </Segment>
          <Grid textAlign='center' relaxed columns={3}>
            <div>
              <Button circular color='facebook' icon='facebook' />
              <Button circular color='twitter' icon='twitter' />
              <Button circular color='linkedin' icon='linkedin' />
              <Button circular color='google plus' icon='google plus' />
            </div>
           </Grid>
        </Form>
      </Segment>
    );
  }
}

export default connect()(Register);

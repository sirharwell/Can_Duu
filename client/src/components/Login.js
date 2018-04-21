import React, { Component } from 'react';
import { Header, Segment, Form, Button, Grid, Image, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/auth';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Segment basic>
        <Grid centered columns={2}>
          <Grid.Column>
            <Divider hidden />
          <Image size='large' src='https://preview.ibb.co/bx8bbc/canduu_no_tag.png' />
              <Header as='h1' textAlign='center'>Login</Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label htmlFor='email'>Email</label>
                  <input
                    required
                    id='email'
                    value={email}
                    placeholder='Email'
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='password'>Password</label>
                  <input
                    required
                    id='password'
                    value={password}
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Segment textAlign='center' basic>
                  <Button.Group size='large'>
                    <Button primary type='submit'>Log In</Button>
                    <Button.Or />
                    <Link to='./register'>
                        <Button secondary> Register </Button>
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
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default connect()(Login);

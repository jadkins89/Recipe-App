import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';

import { userActions, alertActions } from '../actions';
import AlertMessagesList from './AlertMessagesList';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
  }
  
  passwordValidation = (event, dispatch) => {
    var passwordField = event.target.querySelector('[name=password]');
    if (this.state.password.length < 6) {
      passwordField.className += " invalid";
      dispatch(alertActions.addAlert({
        type: 'error',
        text: 'Password must be at least 6 characters long'
      }));
      return false;
    } else {
      passwordField.className += " valid";
      return true;
    }
  }
  
  emailValidation = (event, dispatch) => {
    var emailField = event.target.querySelector('[name=email]');
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regex.test(this.state.email)) {
      emailField.className += " invalid";
      dispatch(alertActions.addAlert({
        type: 'error',
        text: 'Invalid email'
      }));
      return false;
    } else {
      emailField.className += " valid";
      return true;
    }
  }
  
  handleSubmit = event => {
    event.preventDefault();
    
    const { email, password } = this.state;
    const { dispatch } = this.props;
    dispatch(alertActions.clearAlert());
    
    if (this.emailValidation(event, dispatch) && this.passwordValidation(event, dispatch)) {
      this.setState({ submitted: true });
      console.log(email, password);
      dispatch(userActions.login(email, password));
    }
  }
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <MDBContainer>
        <MDBRow className="mt-5">
          <MDBCol md="5" className="m-auto">
            <MDBCard>
              <MDBCardBody>
              <AlertMessagesList />
              <form onSubmit={this.handleSubmit} noValidate>
                <p className="h2 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    name="email"
                    required
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    name="password"
                    required
                  />
                </div>
                <div>
                  <MDBBtn type="submit">Login</MDBBtn>
                  <span className="ml-3">
                    Need an account? <Link to="/register">Register</Link>
                  </span>
                </div>
              </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn // Can be used to display loading screen
  };
}

export default connect(mapStateToProps)(Login);

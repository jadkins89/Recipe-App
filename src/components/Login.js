import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';

import { userActions, alertActions } from '../actions';
import { validationServices } from '../services';
import AlertMessagesList from './AlertMessagesList';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleSubmit = event => {
    event.preventDefault();
    
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    dispatch(alertActions.clearAlert());
    
    if (validationServices.emailValidation(event, email, dispatch) && 
        validationServices.passwordValidation(event, password, dispatch)) {
      dispatch(userActions.login(email, password, history));
    }
  }
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  render() {
    const { email, password } = this.state;
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
                    autoComplete="email"
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
                    autoComplete="current-password"
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

// function mapStateToProps(state) {
//   const { loggingIn } = state.authentication;
//   return {
//     loggingIn // Can be used to display loading screen
//   };
// }

export default withRouter(connect(null)(Login));

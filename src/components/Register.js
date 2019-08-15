import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from "mdbreact";

import { userActions, alertActions } from "actions";
import { validationServices } from "services";
import { AlertMessagesList } from "components";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const { user } = this.state;
    const { dispatch, history } = this.props;
    dispatch(alertActions.clearAlert());

    if (
      validationServices.nameValidation(event, "firstName", dispatch) &&
      validationServices.nameValidation(event, "lastName", dispatch) &&
      validationServices.emailValidation(event, user.email, dispatch) &&
      validationServices.regPasswordValidation(
        event,
        user.password,
        user.confirmPassword,
        dispatch
      )
    ) {
      dispatch(userActions.register(user, history));
    }
  };

  handleChange = event => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    return (
      <MDBContainer>
        <MDBRow className="mt-5">
          <MDBCol sm="10" md="8" lg="6" xl="5" className="m-auto">
            <MDBCard>
              <MDBCardBody>
                <AlertMessagesList />
                <form onSubmit={this.handleSubmit} noValidate>
                  <p className="h2 text-center mb-4">Register</p>
                  <div className="grey-text">
                    <MDBInput
                      label="First Name"
                      group
                      type="text"
                      value={firstName}
                      onChange={this.handleChange}
                      name="firstName"
                      required
                    />
                    <MDBInput
                      label="Last Name"
                      group
                      type="text"
                      value={lastName}
                      onChange={this.handleChange}
                      name="lastName"
                      required
                    />
                    <MDBInput
                      label="Email"
                      group
                      type="email"
                      value={email}
                      onChange={this.handleChange}
                      name="email"
                      autoComplete="email"
                      required
                    />
                    <MDBInput
                      label="Password"
                      group
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                      name="password"
                      autoComplete="new-password"
                      required
                    />
                    <MDBInput
                      label="Confirm Password"
                      group
                      type="password"
                      value={confirmPassword}
                      onChange={this.handleChange}
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div>
                    <MDBBtn type="submit">Register</MDBBtn>
                    <span className="ml-3">
                      Already registered? <Link to="/login">Login</Link>
                    </span>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default connect(null)(Register);

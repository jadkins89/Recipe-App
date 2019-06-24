import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
  }
  handleSubmit = event => {
    
  }
  
  handleChange = event => {
    
  }
  
  render () {
    const { first_name, last_name, email, password, confirm_password } = this.state;
    return (
      <MDBContainer>
        <MDBRow className="mt-5">
          <MDBCol md="5" className="m-auto">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit} noValidate>
                  <p className="h2 text-center mb-4">Register</p>
                    <div className="grey-text">
                      <MDBInput
                        label="First Name"
                        group
                        type="text"
                        value={first_name}
                        onChange={this.handleChange}
                        name="fname"
                        required
                      />
                      <MDBInput
                        label="Last Name"
                        group
                        type="text"
                        value={last_name}
                        onChange={this.handleChange}
                        name="lname"
                        required
                      />
                      <MDBInput
                        label="Email"
                        group
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                        name="email"
                        required
                      />
                      <MDBInput
                        label="Password"
                        group
                        type="password"
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        required
                      />
                      <MDBInput
                        label="Confirm Password"
                        group
                        type="password"
                        value={confirm_password}
                        onChange={this.handleChange}
                        name="cpassword"
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
    )
  }
}

export default Register;
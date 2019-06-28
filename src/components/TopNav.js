import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBFormInline
} from "mdbreact";
import { connect } from "react-redux";
import { userActions } from "../actions";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };

    this.onClick = this.onClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  onLogout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  render() {
    const { onClick, onLogout } = this;
    const { collapse } = this.state;
    return (
      <MDBContainer style={{ marginBottom: `60px` }}>
        <MDBNavbar
          className="p-0"
          light
          expand="md"
          scrolling
          fixed="top"
          color="blue"
        >
          <MDBContainer>
            <MDBNavbarBrand href="/" style={{ marginLeft: `20px` }}>
              <strong>RecipeBook</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={onClick} />
            <MDBCollapse isOpen={collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBFormInline>
                    <div className="md-form my-0">
                      <input
                        className="form-control mr-sm-2"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                  </MDBFormInline>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavLink to="#">Profile</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#">Add Recipe</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBBtn color="blue" onClick={onLogout}>
                    Logout
                  </MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>
    );
  }
}

export default connect(null)(TopNav);

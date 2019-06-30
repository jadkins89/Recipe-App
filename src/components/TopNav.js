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
  MDBNavLink
} from "mdbreact";
import { connect } from "react-redux";
import { userActions } from "../actions";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      path: {
        profile: "/",
        addRecipe: "/addrecipe"
      }
    };

    this.onClick = this.onClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.activePath = this.activePath.bind(this);
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

  activePath(path) {
    const { pathname } = this.props.location;
    return pathname === path;
  }

  render() {
    const { onClick, onLogout, activePath } = this;
    const { collapse, path } = this.state;
    return (
      <MDBContainer style={{ marginBottom: `60px` }}>
        <MDBNavbar
          className="p-0"
          light
          expand="md"
          scrolling
          fixed="top"
          color="light-blue"
        >
          <MDBContainer className="my-1">
            <MDBNavbarBrand href="/" style={{ marginLeft: `20px` }}>
              <strong>RecipeBook</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={onClick} />
            <MDBCollapse isOpen={collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem className="mr-1">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </MDBNavItem>
                <MDBNavItem active={activePath(path.profile)}>
                  <MDBNavLink to="/">Profile</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={activePath(path.addRecipe)}>
                  <MDBNavLink to="/addrecipe">Add Recipe</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBBtn size="sm" color="blue" onClick={onLogout}>
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

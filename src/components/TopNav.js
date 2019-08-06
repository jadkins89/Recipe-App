import React, { useState } from "react";
import { connect } from "react-redux";
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
import { userActions } from "../actions";

const TopNav = props => {
  const path = {
    profile: "/profile",
    addRecipe: "/addrecipe"
  };
  const [collapse, setCollapse] = useState(false);

  const onClick = event => {
    setCollapse(!collapse);
  };

  const onLogout = () => {
    const { dispatch } = props;
    dispatch(userActions.logout());
  };

  const activePath = path => {
    const { pathname } = props.location;
    return pathname === path;
  };
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
                <MDBNavLink to={path.profile}>Profile</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active={activePath(path.addRecipe)}>
                <MDBNavLink to={path.addRecipe}>Add Recipe</MDBNavLink>
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
};

export default connect(null)(TopNav);

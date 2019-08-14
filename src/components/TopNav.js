import React, { useState } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
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
  MDBIcon
} from "mdbreact";
import { userActions } from "actions";
import styled from "styled-components";

const StyledNavItem = styled(MDBNavItem)`
  transition-duration: 0s !important;
  margin: auto 0px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const StyledNavLink = styled(MDBNavLink)`
  color: white !important;
  font-weight: bold;
  font-size: 15px;
  padding: 6px 6px;
`;

const StyledInput = styled.input`
  height: 80%;
`;

const StyledIcon = styled(MDBIcon)`
  color: rgba(0,0,0,0.7);
  &:hover {
    color: rgba(0,0,0,1);
  }
`;

const TopNav = props => {
  const [collapse, setCollapse] = useState(false);

  const onClick = event => {
    setCollapse(!collapse);
  };

  const onLogout = () => {
    const { dispatch } = props;
    dispatch(userActions.logout());
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
        <MDBContainer>
          <MDBNavbarBrand href="/" style={{ marginLeft: `20px` }}>
            <strong>RecipeBook</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler className="ml-auto" onClick={onClick} />
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem className="my-auto mr-1">
                <StyledInput
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </MDBNavItem>
              <StyledNavItem>
                <StyledNavLink to="/profile">Profile</StyledNavLink>
              </StyledNavItem>
              <StyledNavItem>
                <StyledNavLink to="/addrecipe">Add Recipe</StyledNavLink>
              </StyledNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right className="ml-auto">
              <MDBNavItem className="mt-1 mr-3" data-tip="Friends Portal">
                <ReactTooltip effect="solid"/>
                <MDBNavLink className="m-0 p-0" to="/profile">
                  <StyledIcon icon="user-friends"/>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn className="m-0" size="sm" color="blue" onClick={onLogout}>
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

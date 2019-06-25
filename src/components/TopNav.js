import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBFormInline } from 'mdbreact';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  
  render () {
    return (
      <MDBContainer style={{ marginTop: `50px` }}>
        <MDBNavbar light expand="md" scrolling fixed="top" style={{ padding: `0` }}>
          <MDBContainer style={{width: `100%`, maxWidth: `1200px`}}>
            <MDBNavbarBrand href="/" style={{ marginLeft: `20px` }}>
              <strong>RecipeBook</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBFormInline>
                    <div className="md-form my-0">
                      <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
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
                  <MDBNavLink to="#">Logout</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>
    );
  }
}

export default TopNav;
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { recipeActions } from "../actions";

const StyledListItem = styled(MDBListGroupItem)`
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

class SideNav extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    const { user, fetchRecipes, fetchFavoriteRecipes } = this.props;
    if (event.target.getAttribute("name") === "favorites") {
      fetchFavoriteRecipes(user.id);
    } else {
      fetchRecipes(user.id);
    }
  };

  render() {
    return (
      <MDBCol className="border-right" size="auto">
        <h5>Categories</h5>
        <MDBListGroup>
          <StyledListItem
            className="p-0 pl-2 ml-2"
            onClick={this.handleClick}
            hover
          >
            All Recipes
          </StyledListItem>
          <StyledListItem
            className="p-0 pl-2 ml-2"
            onClick={this.handleClick}
            hover
            name="favorites"
          >
            Favorites
          </StyledListItem>
        </MDBListGroup>
      </MDBCol>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { recipes } = state.user_recipes;
  return {
    user,
    recipes
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchRecipes: id => dispatch(recipeActions.getAllByUserId(id)),
    fetchFavoriteRecipes: id => dispatch(recipeActions.getFavorites(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);

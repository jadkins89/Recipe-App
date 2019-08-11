import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { recipeActions } from "actions";
import { AlertMessagesList, Loading } from "components";

class Profile extends Component {
  componentDidMount() {
    const { fetchRecipes, user } = this.props;
    fetchRecipes(user.id);
  }
  render() {
    const { user, recipes } = this.props;

    const favoriteRecipes = recipes => {
      return recipes.reduce((acc, curRecipe) => {
        if (curRecipe.favorite) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
    };

    if (!recipes) {
      return <Loading />;
    } else {
      return (
        <MDBContainer>
          <AlertMessagesList />
          <h1>
            {user.first_name} {user.last_name} Profile
          </h1>
          <p className="h3">Statistics</p>
          <ul>
            <li className="h5">
              Total recipes: {recipes ? recipes.length : ""}
            </li>
            <li className="h5">
              Favorite recipes: {recipes ? favoriteRecipes(recipes) : ""}
            </li>
          </ul>
        </MDBContainer>
      );
    }
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { recipes } = state.userRecipes;
  return {
    user,
    recipes
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchRecipes: id => dispatch(recipeActions.getAllByUserId(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

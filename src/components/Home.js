import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";
import { recipeActions } from "../actions";

class Home extends Component {
  componentDidMount() {
    const { user, fetchRecipes } = this.props;
    fetchRecipes(user.id);
  }
  render() {
    const { user, recipes } = this.props;
    return (
      <MDBContainer>
        <AlertMessagesList />
        <h1>Welcome {user.first_name}</h1>
        {recipes
          ? recipes.map((recipe, index) => {
              return (
                <h4 key={"recipe_" + user.id + "_" + index}>{recipe.name}</h4>
              );
            })
          : null}
      </MDBContainer>
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
    fetchRecipes: id => dispatch(recipeActions.getAllByUserId(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

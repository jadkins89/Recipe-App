import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBNavLink } from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";
import { recipeActions } from "../actions";
import { SideNav } from "./";

class Home extends Component {
  componentDidMount() {
    const { user, fetchRecipes } = this.props;
    fetchRecipes(user.id);
  }
  render() {
    const { user, recipes } = this.props;
    return (
      <MDBContainer className="d-flex">
        <MDBRow className="mt-3">
          <SideNav />
          <MDBCol>
            <AlertMessagesList />
            <h5>Recipes</h5>
            {recipes
              ? recipes.map((recipe, index) => {
                  return (
                    <MDBNavLink
                      key={"recipe_" + user.id + "_" + index}
                      to={"recipes/" + recipe.id}
                    >
                      {recipe.name}
                    </MDBNavLink>
                  );
                })
              : null}
          </MDBCol>
        </MDBRow>
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

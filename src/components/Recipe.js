import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { recipeActions } from "../actions";

class Recipe extends Component {
  componentDidMount() {
    const { dispatch, history } = this.props;
    let id = this.props.match.params.recipe_id;
    let name = this.props.match.params.recipe_name;
    dispatch(recipeActions.get(id, name, history));
  }

  render() {
    const { recipe } = this.props;
    const times = Object.keys(recipe.time).map((key, index) => {
      return (
        <div className="m-0 p-0" key={key}>
          {recipe.time[key] ? (
            <div className="mx-3">
              <div className="text-center border-left px-2">
                <p className="m-0 text-capitalize">{key}</p>
                <small className="m-0">{recipe.time[key]}</small>
              </div>
            </div>
          ) : null}
        </div>
      );
    });
    return (
      <>
        {recipe.isFetching ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <MDBContainer className="p-0">
            <MDBRow>
              <MDBCol size="12" lg="8" className="m-auto">
                <MDBCard className="mt-3">
                  <MDBCardBody>
                    <p className="h2 text-center mb-4">{recipe.name}</p>
                    <div className="d-flex justify-content-center">
                      <i className="far fa-clock fa-2x px-3 my-auto text-muted" />
                      {times}
                    </div>
                    <p className="h5">Ingredients</p>
                    <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

export default connect(mapStateToProps)(Recipe);

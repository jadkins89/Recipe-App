import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const RecipeComponent = props => {
  const { recipe } = props;

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

  const ingredients = recipe.ingredients.map((ingredient, index) => {
    return (
      <div className="d-flex m-0 p-0" key={"ingredient-" + index}>
        <MDBIcon className="my-auto mr-3" icon="plus grey-text" />
        <p className="m-0">{ingredient}</p>
      </div>
    );
  });

  const instructions = recipe.instructions.map((instruction, index) => {
    return (
      <div className="d-flex m-0 pb-2" key={"instruction-" + index}>
        <MDBIcon className="my-1 mr-3" icon="plus grey-text" />
        <p className="m-0">{instruction}</p>
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
                  <p className="h5 my-2">Ingredients</p>
                  <hr />
                  {ingredients}
                  <p className="h5 mt-3 mb-2">Instructions</p>
                  <hr />
                  {instructions}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
};

export default RecipeComponent;

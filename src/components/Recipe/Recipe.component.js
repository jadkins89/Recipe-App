import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";
import styled from "styled-components";
import classNames from "classnames";

const StyledStar = styled.span`
  font-size: 20px;
  float: right;
  padding-top: 8px;
  &:hover {
    cursor: pointer;
  }
`;

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

  const onClick = event => {
    const { setFavorite, recipe_id, user_id } = props;
    if (event.target.className === "far fa-star") {
      event.target.className = "fas fa-star";
      setFavorite(user_id, recipe_id, true);
    } else {
      event.target.className = "far fa-star";
      setFavorite(user_id, recipe_id, false);
    }
  };

  const favoriteIcon = classNames({
    "far fa-star": !recipe.favorite,
    "fas fa-star": recipe.favorite
  });

  return (
    <MDBContainer className="p-0">
      <MDBRow>
        <MDBCol size="12" lg="8" className="m-auto">
          <MDBCard className="mt-3">
            <MDBCardBody>
              <p className="h2 text-center mb-4">
                {recipe.name}
                <StyledStar>
                  <i
                    className={favoriteIcon}
                    onClick={onClick}
                    title="Favorite"
                  />
                </StyledStar>
              </p>
              <div className="d-flex justify-content-center">
                <i className="far fa-clock fa-2x px-3 my-auto text-muted" />
                {times}
              </div>
              <p className="h5 my-2">Ingredients</p>
              <hr /> {ingredients}
              <p className="h5 mt-3 mb-2">Instructions</p>
              <hr /> {instructions}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RecipeComponent;

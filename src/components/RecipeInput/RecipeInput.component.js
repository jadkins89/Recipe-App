import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import ItemInputList from "./ItemInputList";
import TimeInput from "./TimeInput.js";

const RecipeInputComponent = props => {
  const { name, handleChange, addListItem } = props;
  return (
    <>
      <MDBRow>
        <MDBCol size="6" className="m-auto">
          <MDBInput
            label="Recipe Title"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            size="lg"
            outline
            required
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBContainer>
          <TimeInput />
          <hr />
        </MDBContainer>
      </MDBRow>
      <MDBRow>
        <MDBContainer>
          <h5 className="mx-4">Ingredients</h5>
          <hr />
          <ItemInputList name="ingredients" />
          <MDBBtn size="sm" name="ingredients" onClick={addListItem}>
            <MDBIcon icon="plus" className="mr-2" />
            Add Ingredient
          </MDBBtn>
        </MDBContainer>
      </MDBRow>
      <MDBRow>
        <MDBContainer className="mt-3">
          <h5 className="mx-4">Instructions</h5>
          <hr />
          <ItemInputList name="instructions" />
          <MDBBtn size="sm" name="instructions" onClick={addListItem}>
            <MDBIcon icon="plus" className="mr-2" />
            Add Instruction
          </MDBBtn>
        </MDBContainer>
      </MDBRow>
    </>
  );
};

export default RecipeInputComponent;

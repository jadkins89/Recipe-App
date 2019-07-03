import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCardText
} from "mdbreact";

import UrlSubmitBox from "./AddRecipe/UrlSubmitBox";
import ItemInputList from "./AddRecipe/ItemInputList";
import TimeInput from "./AddRecipe/TimeInput";
import { recipeActions } from "../actions";

class AddRecipe extends Component {
  render() {
    const { handleChange, handleSubmit, addListItem } = this.props;
    const { name } = this.props.recipe;
    return (
      <MDBContainer className="p-0">
        <UrlSubmitBox />
        <MDBContainer>
          <MDBRow>
            <MDBCol size="8" className="m-auto">
              <MDBCard className="mt-3">
                <MDBCardBody>
                  <form onSubmit={handleSubmit} noValidate>
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
                        <MDBBtn
                          size="sm"
                          name="ingredients"
                          onClick={addListItem}
                        >
                          <MDBIcon icon="plus" className="mr-2" />
                          Add Ingredient
                        </MDBBtn>
                      </MDBContainer>
                    </MDBRow>
                    <MDBRow>
                      <MDBContainer className="mt-3">
                        <h5 className="mx-4">Directions</h5>
                        <hr />
                        <ItemInputList name="instructions" />
                        <MDBBtn
                          size="sm"
                          name="instructions"
                          onClick={addListItem}
                        >
                          <MDBIcon icon="plus" className="mr-2" />
                          Add Direction
                        </MDBBtn>
                      </MDBContainer>
                    </MDBRow>
                    <MDBCol className="text-center mt-2 p-0">
                      <MDBCardText>
                        Modify to your hearts delight. Drag and drop items from
                        the left to change order. Submit once ready.
                      </MDBCardText>
                      <div className="float-right">
                        <MDBBtn type="submit" style={{ borderRadius: `28px` }}>
                          Submit
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    );
  }
}

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChange: event =>
      dispatch(
        recipeActions.handleChange(event.target.name, event.target.value)
      ),
    addListItem: event =>
      dispatch(recipeActions.addListItem(event.target.name)),
    handleSubmit: event => {
      event.preventDefault();
      dispatch(recipeActions.add(ownProps.history));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe);

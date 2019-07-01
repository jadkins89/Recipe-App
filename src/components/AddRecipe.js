import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBBtn
} from "mdbreact";
import AlertMessagesList from "./AlertMessagesList";
// Add alert message when url fails
import UrlSubmitBox from "./AddRecipe/UrlSubmitBox";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      recipe
    };
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }

  handleUrlSubmit = () => {
    this.setState({
      recipe: this.props.recipe
    });
  };

  handleChange = event => {
    const { recipe } = this.state;
    const { name, value } = event.target;

    if (name === "name") {
      this.setState({
        recipe: {
          ...recipe,
          [name]: value
        }
      });
    } else if (
      !name.includes("ingredients") &&
      !name.includes("instructions")
    ) {
      this.setState({
        recipe: {
          ...recipe,
          time: {
            ...recipe.time,
            [name]: value
          }
        }
      });
    } else {
      let parsedName = name.split("-");
      let currentName = parsedName[0];
      let index = parseInt(parsedName[1]);
      var newArray = recipe[currentName];
      newArray[index] = value;

      this.setState({
        recipe: {
          ...recipe,
          [currentName]: newArray
        }
      });
    }
  };

  render() {
    const { handleChange, handleUrlSubmit } = this;
    const { ingredients, instructions, name } = this.state.recipe;
    return (
      <MDBContainer className="p-0">
        <UrlSubmitBox handleUrlSubmit={handleUrlSubmit} />
        <MDBContainer>
          <MDBRow>
            <MDBCol size="8" className="m-auto">
              <MDBCard className="mt-3">
                <MDBCardBody>
                  <form noValidate>
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
                        <h5 className="mx-4">Ingredients</h5>
                        <hr />
                        {ingredients.map((ingredient, index) => (
                          <div
                            className="d-flex p-1 justify-content-between"
                            key={"ingredient-" + index}
                          >
                            <MDBInput
                              containerClass="flex-fill m-0"
                              className="my-0"
                              icon="plus"
                              name={"ingredients-" + index}
                              value={ingredient}
                              onChange={handleChange}
                              size="sm"
                              outline
                            />
                            <button className="border-0">&times;</button>
                          </div>
                        ))}
                      </MDBContainer>
                    </MDBRow>
                    <MDBRow>
                      <MDBContainer className="mt-3">
                        <h5 className="mx-4">Directions</h5>
                        <hr />
                        {instructions.map((instruction, index) => (
                          <div
                            className="d-flex p-1 justify-content-between"
                            key={"instruction-" + index}
                          >
                            <span className="mt-auto mr-2">{index + 1}.</span>
                            <MDBInput
                              containerClass="flex-fill m-0 pr-0"
                              className="m-0"
                              type="textarea"
                              name={"instructions-" + index}
                              value={instruction}
                              onChange={handleChange}
                              size="sm"
                              outline
                            />
                            <button className="border-0">&times;</button>
                          </div>
                        ))}
                      </MDBContainer>
                    </MDBRow>
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
  const { recipe } = state.recipe;
  return {
    recipe
  };
}

export default connect(mapStateToProps)(AddRecipe);

import React, { Component } from "react";
import { connect } from "react-redux";

class IngredientInput extends Component {
  render() {
    const { ingredient, index, deleteItem, onChange } = this.props;
    return (
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
        <button
          className="border-0"
          name={"ingredients-" + index}
          onClick={deleteItem}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default IngredientInput;

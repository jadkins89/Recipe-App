import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBInput, MDBIcon } from "mdbreact";
import { Draggable } from "react-beautiful-dnd";
import { recipeActions } from "../../actions";

class ItemInput extends Component {
  render() {
    const { item, name, index, handleChange, deleteListItem } = this.props;
    const itemName = name + "-" + index;
    let instruction = name === "instructions";
    let inputField;

    if (instruction) {
      inputField = (
        <>
          <span className="mt-auto mr-2">{index + 1}.</span>
          <textarea
            className="flex-fill m-0 my-0"
            name={itemName}
            value={item}
            onChange={handleChange}
          />
        </>
      );
    } else {
      inputField = (
        <>
          <MDBIcon className="my-auto mr-2" icon="plus" />
          <input
            className="flex-fill m-0 my-0"
            name={itemName}
            value={item}
            onChange={handleChange}
          />
        </>
      );
    }

    return (
      <Draggable draggableId={"2" + index} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="d-flex p-1 justify-content-between"
            key={itemName}
          >
            {inputField}
            <button
              className="border-0"
              name={itemName}
              onClick={deleteListItem}
            >
              &times;
            </button>
          </div>
        )}
      </Draggable>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: event =>
      dispatch(
        recipeActions.handleChange(event.target.name, event.target.value)
      ),
    deleteListItem: event => {
      event.preventDefault();
      dispatch(recipeActions.deleteListItem(event.target.name));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ItemInput);

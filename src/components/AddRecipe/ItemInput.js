import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBInput } from "mdbreact";
import { Draggable } from "react-beautiful-dnd";
import { recipeActions } from "../../actions";

class ItemInput extends Component {
  render() {
    const { item, name, index, handleChange, deleteListItem } = this.props;
    const itemName = name + "-" + index;
    let instruction = name === "instructions";
    let order;

    if (instruction) {
      order = <span className="mt-auto mr-2">{index + 1}.</span>;
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
            {order}
            <MDBInput
              containerClass="flex-fill m-0"
              className="my-0"
              icon={instruction ? null : "plus"}
              type={instruction ? "textarea" : null}
              name={itemName}
              value={item}
              onChange={handleChange}
              size="sm"
              outline
            />
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
    handleChange: event => dispatch(recipeActions.handleChange(event)),
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

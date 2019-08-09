import React from "react";
import { connect } from "react-redux";
import { MDBIcon } from "mdbreact";
import { Draggable } from "react-beautiful-dnd";
import { recipeActions } from "actions";

const ItemInput = props => {
  const handleHeight = event => {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const revertHeight = event => {
    event.target.style.height = "60px";
  };

  const { item, name, index, handleChange, deleteListItem } = props;
  const itemName = name + "-" + index;
  let ingredients = name === "ingredients";
  let inputField;

  if (ingredients) {
    inputField = (
      <>
        <MDBIcon className="my-auto mr-2" icon="plus grey-text" />
        <input
          className="flex-fill form-control mr-1"
          name={itemName}
          value={item}
          onChange={handleChange}
        />
      </>
    );
  } else {
    inputField = (
      <>
        <span className="mt-auto mr-2">{index + 1}.</span>
        <textarea
          className="flex-fill form-control mr-1"
          onFocus={handleHeight}
          onInput={handleHeight}
          onBlur={revertHeight}
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
          <button className="border-0" name={itemName} onClick={deleteListItem}>
            &times;
          </button>
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = {
  handleChange: event =>
    recipeActions.handleChange(event.target.name, event.target.value),
  deleteListItem: event => {
    event.preventDefault();
    return recipeActions.deleteListItem(event.target.name);
  }
};

export default connect(
  null,
  mapDispatchToProps
)(ItemInput);

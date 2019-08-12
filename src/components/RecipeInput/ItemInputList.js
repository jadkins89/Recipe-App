import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ItemInput from "./ItemInput";
import { recipeActions } from "actions";

const ItemInputList = props => {
  const onDragEnd = result => {
    const { recipe, name, handleDrop } = props;
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const newList = Array.from(recipe[name]);
    const item = newList[source.index];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, item);

    handleDrop(name, newList);
  };

  const { name, recipe } = props;
  const items = recipe[name].map((item, index) => (
    <ItemInput name={name} index={index} item={item} key={name + "-" + index} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable-" + name}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = state => {
  const { recipe } = state;
  return {
    recipe
  };
};

const mapDispatchToProps = {
  handleDrop: (name, value) => recipeActions.handleDrop(name, value)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemInputList);

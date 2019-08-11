import React from "react";
import { connect } from "react-redux";

import { recipeActions } from "actions";

const TimeInput = props => {
  const { recipe, handleChange } = props;
  const times = Object.keys(recipe.time).map((key, index) => {
    return (
      <div className="mx-3" key={key}>
        <p className="m-0 text-capitalize">{key}</p>
        <input
          className="py-0 pr-0 form-control form-control-sm"
          name={key}
          value={recipe.time[key]}
          onChange={handleChange}
        />
      </div>
    );
  });
  return (
    <div className="d-flex">
      <i className="far fa-clock fa-2x ml-4 my-auto text-muted" />
      {times}
    </div>
  );
};

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

const mapDispatchToProps = {
  handleChange: event =>
    recipeActions.handleChange(event.target.name, event.target.value)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeInput);

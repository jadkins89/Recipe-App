import React, { Component } from "react";
import { connect } from "react-redux";
import { recipeActions } from "../actions";

class Recipe extends Component {
  componentDidMount() {
    let id = this.props.match.params.recipe_id;
    this.props.dispatch(recipeActions.get(id));
  }

  render() {
    const { recipe } = this.props;
    return (
      <div className="container">
        <h4>{recipe.name}</h4>
        {recipe.ingredients.map(item => {
          return <p>{item}</p>;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { recipe } = state;
  return {
    recipe
  };
}

export default connect(mapStateToProps)(Recipe);

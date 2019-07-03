import React, { Component } from "react";
import { connect } from "react-redux";
import { recipeActions } from "../actions";

class Recipe extends Component {
  componentDidMount() {
    let id = this.props.match.params.recipe_id;
    this.props.dispatch(recipeActions.get(id));
  }

  render() {
    return (
      <div className="container">
        <h4>recipes!</h4>
      </div>
    );
  }
}

export default connect()(Recipe);

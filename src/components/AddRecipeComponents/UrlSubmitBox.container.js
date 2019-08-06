import React, { Component } from "react";
import { connect } from "react-redux";
import { recipeActions } from "../../actions";
import UrlSubmitBoxComponent from "./UrlSubmitBox.component";

class UrlSubmitBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { url } = this.state;
    const { dispatch } = this.props;
    dispatch(recipeActions.find(url));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { url } = this.state;
    return (
      <>
        <UrlSubmitBoxComponent
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          url={url}
        />
      </>
    );
  }
}

export default connect(null)(UrlSubmitBox);

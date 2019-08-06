import React from "react";
import PropTypes from "prop-types";
import { MDBAlert } from "mdbreact";
import classNames from "classnames";

const AlertMessage = props => {
  const { deleteAlert } = props;
  const { type, text, id } = props.message;

  const onClick = event => {
    deleteAlert(id);
  };

  var alertColor = classNames({
    success: type === "success",
    danger: type === "error"
  });

  return (
    <MDBAlert color={alertColor}>
      <button className="close" onClick={onClick}>
        <span>&times;</span>
      </button>
      {text}
    </MDBAlert>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteAlert: PropTypes.func.isRequired
};

export default AlertMessage;

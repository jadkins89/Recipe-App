import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBAlert } from 'mdbreact';
import classNames from 'classnames';

class AlertMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
      this.props.deleteAlert(this.props.message.id);
  }
  
  render() {
    const { type, text } = this.props.message;
    
    var alertColor = classNames({
      'success': type === 'success',
      'danger': type === 'error'
    });
    
    return (
      <MDBAlert color={alertColor}>
        <button className="close" onClick={this.onClick}><span>&times;</span></button>
        {text}
      </MDBAlert>
    );
  }
}

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteAlert: PropTypes.func.isRequired
  
}

export default AlertMessage;
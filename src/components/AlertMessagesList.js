import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AlertMessage from './AlertMessage';
import { alertActions } from '../actions';

class AlertMessagesList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <AlertMessage key={message.id} message={message} deleteAlert={this.props.deleteAlert}  />
    ));
    return (
      <div>{messages}</div>
    );
  }
}

AlertMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteAlert: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.alerts
  }
}

const deleteAlert = alertActions.deleteAlert;
export default connect(mapStateToProps, { deleteAlert })(AlertMessagesList);


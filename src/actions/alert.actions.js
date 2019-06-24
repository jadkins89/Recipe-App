import { alertConstants } from '../constants';

export const alertActions = {
  addAlert,
  deleteAlert,
  clearAlert
};

function addAlert(message) {
  return { 
    type: alertConstants.ADD_ALERT,
    message
  }
}

function deleteAlert(id) {
  return { 
    type: alertConstants.DELETE_ALERT,
    id
  }
}

function clearAlert() {
  return {
    type: alertConstants.CLEAR_ALERT
  }
}
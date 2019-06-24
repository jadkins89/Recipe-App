import { history } from '../helpers';
import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '../actions';

export const userActions = {
  login
}

function login(email, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
  
  return dispatch => {
      dispatch(request({ email }));
      userService.login(email, password)
        .then(
          user => {
            console.log("user: " + user);
            dispatch(success(user));
            history.push('/');
          },
          error => {
            console.log(error);
            let parsedError = JSON.parse(error);
            let message = {
              type: parsedError.error.status === 200 ? 'success' : 'error',
              text: parsedError.message
            }
            dispatch(failure(parsedError));
            dispatch(alertActions.addAlert(message));
            // dispatch(alertActions.error(error.toString()));
          }
        );
  };
}
// import { history } from '../helpers';
import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '../actions';

export const userActions = {
  login,
  register
}

function login(email, password, history) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
  
  return dispatch => {
      dispatch(request({ email }));
      userService.login(email, password)
        .then(
          user => {
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
          }
        );
  };
}

function register(user, history) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
  
  return dispatch => {
    dispatch(request(user));
    userService.register(user)
      .then(
        user => {
          console.log(user);
          dispatch(success(user));
          history.push('/login');
          dispatch(alertActions.addAlert({
            type: 'success',
            text: 'Registration Successful'
          }));
        },
        error => {
          console.log(error);
          let parsedError = JSON.parse(error);
          let message = {
            type: parsedError.error.status === 200 ? 'success': 'error',
            text: parsedError.message
          }
          dispatch(failure(parsedError));
          dispatch(alertActions.addAlert(message));
        }
      )
  }
}
import { userConstants } from "actionConstants";
import { userServices } from "services";
import { alertActions } from "actions";

export const userActions = {
  login,
  register,
  logout,
  authenticate
};

function login(email, password, history) {
  return dispatch => {
    dispatch(request());
    userServices.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        console.log(error);
        let parsedError = JSON.parse(error);
        let message = {
          type: parsedError.error.status === 200 ? "success" : "error",
          text: parsedError.message
        };
        dispatch(failure(parsedError));
        dispatch(alertActions.addAlert(message));
      }
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function register(user, history) {
  return dispatch => {
    dispatch(request());
    userServices.register(user).then(
      user => {
        dispatch(success(user));
        history.push("/login");
        dispatch(
          alertActions.addAlert({
            type: "success",
            text: "Registration Successful"
          })
        );
      },
      error => {
        console.log(error);
        let parsedError = JSON.parse(error);
        let message = {
          type: parsedError.error.status === 200 ? "success" : "error",
          text: parsedError.message
        };
        dispatch(failure(parsedError));
        dispatch(alertActions.addAlert(message));
      }
    );
  };

  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function logout() {
  return dispatch => {
    dispatch(request());
    userServices.logout();
    dispatch(success());
  };

  function request() {
    return { type: userConstants.LOGOUT_REQUEST };
  }

  function success() {
    return { type: userConstants.LOGOUT_SUCCESS };
  }
}

function authenticate() {
  return dispatch => {
    dispatch(request());
    return userServices.authenticate().then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.AUTH_REQUEST };
  }
  function success(user) {
    return { type: userConstants.AUTH_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.AUTH_FAILURE, error };
  }
}

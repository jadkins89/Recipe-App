import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "../actions";

export const userActions = {
  login,
  register,
  logout,
  authenticate
};

function login(email, password, history) {
  return dispatch => {
    dispatch(request());
    userService.login(email, password).then(
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
    return {
      type: userConstants.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false
    };
  }
  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user,
      isFetching: false,
      isAuthenticated: true
    };
  }
  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error,
      isFetching: false,
      isAuthenticated: false
    };
  }
}

function register(user, history) {
  return dispatch => {
    dispatch(request(user));
    userService.register(user).then(
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

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
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
    userService.logout();
    dispatch(success());
  };

  function request() {
    return {
      type: userConstants.LOGOUT_REQUEST,
      isAuthenticated: true
    };
  }

  function success() {
    return {
      type: userConstants.LOGOUT_SUCCESS,
      isAuthenticated: false
    };
  }
}

function authenticate() {
  return dispatch => {
    dispatch(request());
    return userService.authenticate().then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: userConstants.AUTH_REQUEST,
      isAuthenticated: false,
      isFetching: true
    };
  }
  function success(user) {
    return {
      type: userConstants.AUTH_SUCCESS,
      isAuthenticated: true,
      isFetching: false,
      user
    };
  }
  function failure(error) {
    return { type: userConstants.AUTH_FAILURE, isAuthenticated: false, error };
  }
}

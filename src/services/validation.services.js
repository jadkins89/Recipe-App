import { alertActions } from "actions";

export const validationServices = {
  passwordValidation,
  regPasswordValidation,
  emailValidation,
  nameValidation
};

function passwordValidation(event, password, dispatch) {
  var passwordField = event.target.querySelector("[name=password]");
  if (password.length < 6) {
    passwordField.className += " invalid";
    dispatch(
      alertActions.addAlert({
        type: "error",
        text: "Password must be at least 6 characters long"
      })
    );
    return false;
  } else {
    passwordField.className += " valid";
    return true;
  }
}

function regPasswordValidation(event, password, confirmPassword, dispatch) {
  var passwordField = event.target.querySelector("[name=password]");
  var ConfirmPasswordField = event.target.querySelector(
    "[name=confirmPassword]"
  );
  if (!passwordValidation(event, password, dispatch)) {
    return false;
  } else if (password !== confirmPassword) {
    passwordField.className += " invalid";
    ConfirmPasswordField.className += " invalid";
    dispatch(
      alertActions.addAlert({
        type: "error",
        text: "Passwords do not match."
      })
    );
    return false;
  } else {
    passwordField.className += " valid";
    ConfirmPasswordField.className += " valid";
    return true;
  }
}

function emailValidation(event, email, dispatch) {
  var emailField = event.target.querySelector("[name=email]");
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    emailField.className += " invalid";
    dispatch(
      alertActions.addAlert({
        type: "error",
        text: "Invalid email"
      })
    );
    return false;
  } else {
    emailField.className += " valid";
    return true;
  }
}

function nameValidation(event, name, dispatch) {
  var nameField = event.target.querySelector(`[value=${name}]`);
  if (nameField.value.length > 10) {
    nameField.className += " invalid";
    dispatch(
      alertActions.addAlert({
        type: "error",
        text: `Names must be under 10 characters long`
      })
    );
    return false;
  } else {
    nameField.className += " valid";
    return true;
  }
}

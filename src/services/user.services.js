import config from "config";

export const userServices = {
  login,
  register,
  logout,
  authenticate
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${config.apiUrl}/users/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
      let payload = JSON.parse(response);
      localStorage.setItem("jwtToken", payload.token);

      return payload.loggedUser;
    });
}

function logout() {
  localStorage.removeItem("jwtToken");
}

function register(user) {
  const { firstName, lastName, email, password } = user;
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password })
  };
  return fetch(`${config.apiUrl}/users/register`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return JSON.parse(response);
    });
}

function authenticate() {
  let token = localStorage.getItem("jwtToken") || null;
  let requestOptions = {};

  // Could pass isAuthenticated in later to stop api call if false
  if (token) {
    requestOptions = {
      method: "GET",
      mode: "cors",
      headers: { Authorization: `Bearer ${token}` }
    };
  } else {
    return Promise.reject();
  }

  return fetch(`${config.apiUrl}/auth`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return JSON.parse(response);
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text;
    if (!response.ok) {
      if (response.status === 401) {
        // logout
        // window.location.reload(true);
      }
      return Promise.reject(data);
    }
    return data;
  });
}

import config from '../config';

export const userService = {
  login,
  register
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${config.apiUrl}/users/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
      let payload = JSON.parse(response);
      console.log(payload);
      localStorage.setItem('jwtToken', payload.token);
      
      return payload.loggedUser;
    });
}

function register(user) {
  const { firstName, lastName, email, password } = user;
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password })
  };
  return fetch(`${config.apiUrl}/users/register`, requestOptions)
    .then(handleResponse);
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
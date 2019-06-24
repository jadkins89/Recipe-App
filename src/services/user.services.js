import config from '../config';

export const userService = {
  login
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
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
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
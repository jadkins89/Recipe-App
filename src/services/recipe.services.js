import config from "../config";

export const recipeServices = {
  add,
  find
};

function add(recipe) {
  const requestOptions = requestHandler("POST", recipe);
  return fetch(`${config.apiUrl}/recipes/add`, requestOptions)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => {
      return error;
    });
}

function find(url) {
  const requestOptions = requestHandler("POST", { url: url });
  return fetch(`${config.apiUrl}/recipes/find`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return JSON.parse(response);
    });
}

function requestHandler(type, body) {
  var token = localStorage.getItem("jwtToken") || null;
  return {
    method: type,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  };
}

// Probably move into helper file
function handleResponse(response) {
  return response.text().then(text => {
    const data = text;
    if (!response.ok) {
      return Promise.reject(data);
    }
    return data;
  });
}

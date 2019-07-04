import config from "../config";

export const recipeServices = {
  add,
  scrape,
  findById
};

function add(recipe, user_id) {
  const requestOptions = requestHandler("POST", {
    recipe: recipe,
    user_id: user_id
  });
  return fetch(`${config.apiUrl}/recipes/add`, requestOptions)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => {
      return error;
    });
}

function scrape(url) {
  const requestOptions = requestHandler("POST", { url: url });
  return fetch(`${config.apiUrl}/recipes/scrape`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return JSON.parse(response);
    });
}

function findById(id) {
  const requestOptions = requestHandler("GET");
  return fetch(`${config.apiUrl}/recipes/find/${id}`, requestOptions)
    .then(response => {
      return response.json().then(data => {
        return data;
      });
    })
    .catch(error => {
      console.log(error);
      return error;
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
    body: body ? JSON.stringify(body) : null
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

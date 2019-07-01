import config from "../config";

export const recipeServices = {
  add
};

var token = localStorage.getItem("jwtToken") || null;

function add(recipe) {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(recipe)
  };
  return fetch(`${config.apiUrl}/recipes/add`, requestOptions)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => {
      return error;
    });
}

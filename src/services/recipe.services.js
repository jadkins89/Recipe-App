import config from "config";

export const recipeServices = {
  add,
  update,
  deleteUsersRecipes,
  scrape,
  findById,
  findByUserId,
  findFavorites,
  setFavorite,
  isFavorite
};

function add(recipe, userId) {
  const requestOptions = requestHandler("POST", {
    recipe: recipe,
    user_id: userId
  });
  return fetch(`${config.apiUrl}/recipes/add`, requestOptions)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => {
      return error;
    });
}

function update(recipe, recipeId, userId) {
  const requestOptions = requestHandler("POST", {
    recipe: recipe,
    recipe_id: recipeId,
    user_id: userId
  });
  return fetch(`${config.apiUrl}/recipes/create_or_update`, requestOptions)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(error => {
      return error;
    });
}

function deleteUsersRecipes(recipeId, userId) {
  const requestOptions = requestHandler("DELETE");
  return fetch(
    `${config.apiUrl}/recipes/delete_users_recipes/${recipeId}/${userId}`,
    requestOptions
  )
    .then(handleResponse)
    .then(response => {
      return JSON.parse(response);
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

function findById(recipeId) {
  const requestOptions = requestHandler("GET");
  return fetch(`${config.apiUrl}/recipes/find_one/${recipeId}`, requestOptions)
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response);
      } else {
        return response.json().then(data => {
          return data;
        });
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function findByUserId(id) {
  const requestOptions = requestHandler("GET");
  return fetch(
    `${config.apiUrl}/recipes/find_by_user_id/${id}`,
    requestOptions
  ).then(response => {
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      return response.json().then(data => {
        return data;
      });
    }
  });
}

function findFavorites(userId) {
  const requestOptions = requestHandler("GET");
  return fetch(
    `${config.apiUrl}/recipes/find_favorites/${userId}`,
    requestOptions
  ).then(response => {
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      return response.json().then(data => {
        return data;
      });
    }
  });
}

function setFavorite(userId, recipeId, value) {
  const requestOptions = requestHandler("POST", { userId, recipeId, value });
  return fetch(`${config.apiUrl}/recipes/set_favorite/`, requestOptions)
    .then(handleResponse)
    .then(response => {
      let res = JSON.parse(response);
      if (res.affectedRows !== 1) {
        return Promise.reject("Query Failed");
      } else {
        return res;
      }
    });
}

function isFavorite(userId, recipeId) {
  const requestOptions = requestHandler("GET");
  return fetch(
    `${config.apiUrl}/recipes/is_favorite/${userId}/${recipeId}`,
    requestOptions
  )
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

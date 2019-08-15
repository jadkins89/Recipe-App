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
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/add`,
        requestOptions
      );
      let data = await handleResponse(response);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
}

function update(recipe, recipeId, userId) {
  const requestOptions = requestHandler("POST", {
    recipe: recipe,
    recipe_id: recipeId,
    user_id: userId
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/create_or_update`,
        requestOptions
      );
      let data = await handleResponse(response);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
}

function deleteUsersRecipes(recipeId, userId) {
  const requestOptions = requestHandler("DELETE");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/delete_users_recipes/${recipeId}/${userId}`,
        requestOptions
      );
      let data = await handleResponse(response);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
}

function scrape(url) {
  const requestOptions = requestHandler("POST", { url: url });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/scrape`,
        requestOptions
      );
      let data = await handleResponse(response);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
}

function findById(recipeId) {
  const requestOptions = requestHandler("GET");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/find_one/${recipeId}`,
        requestOptions
      );
      if (response.status !== 200) {
        reject(response);
      } else {
        let data = await response.json();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function findByUserId(id) {
  const requestOptions = requestHandler("GET");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/find_by_user_id/${id}`,
        requestOptions
      );
      if (response.status !== 200) {
        reject(response);
      } else {
        let data = await response.json();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function findFavorites(userId) {
  const requestOptions = requestHandler("GET");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/find_favorites/${userId}`,
        requestOptions
      );
      if (response.status !== 200) {
        reject(response);
      } else {
        let data = await response.json();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Re-write front / back for better error handling
function setFavorite(userId, recipeId, value) {
  const requestOptions = requestHandler("POST", { userId, recipeId, value });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/set_favorite/`,
        requestOptions
      );
      let parsedData = JSON.parse(await handleResponse(response));
      if (parsedData.affectedRows !== 1) {
        reject("Query Failed");
      } else {
        resolve(parsedData);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function isFavorite(userId, recipeId) {
  const requestOptions = requestHandler("GET");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${config.apiUrl}/recipes/is_favorite/${userId}/${recipeId}`,
        requestOptions
      );
      let data = await handleResponse(response);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
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

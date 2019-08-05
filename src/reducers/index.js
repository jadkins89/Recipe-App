import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import alerts from "./alert.reducer";
import recipe from "./recipe.reducer";
import user_recipes from "./user_recipes.reducer";

export default combineReducers({
  authentication,
  alerts,
  recipe,
  user_recipes
});

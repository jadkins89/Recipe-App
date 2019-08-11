import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import alerts from "./alert.reducer";
import recipe from "./recipe.reducer";
import userRecipes from "./userRecipes.reducer";
import modifyRecipe from "./modifyRecipe.reducer";

export default combineReducers({
  authentication,
  alerts,
  recipe,
  userRecipes,
  modifyRecipe
});

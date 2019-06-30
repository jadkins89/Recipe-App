import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import alerts from "./alert.reducer";
import recipe from "./recipe.reducer";

export default combineReducers({
  authentication,
  alerts,
  recipe
});

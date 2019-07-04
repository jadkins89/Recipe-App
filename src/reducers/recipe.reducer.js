import { recipeConstants } from "../constants";

const initialState = {
  name: "",
  ingredients: [""],
  instructions: [""],
  time: {
    prep: "",
    cook: "",
    active: "",
    inactive: "",
    total: "",
    ready: ""
  }
};

export default function recipe(state = initialState, action = {}) {
  switch (action.type) {
    case recipeConstants.ADD_RECIPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAdded: false
      });
    case recipeConstants.ADD_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAdded: true,
        ...initialState
      });
    case recipeConstants.ADD_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAdded: false,
        error: action.error
      });
    case recipeConstants.FIND_RECIPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case recipeConstants.FIND_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.recipe
      });
    case recipeConstants.FIND_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case recipeConstants.MODIFY_RECIPE_NAME:
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case recipeConstants.MODIFY_RECIPE_TIME:
      return Object.assign({}, state, {
        time: {
          ...state.time,
          [action.name]: action.value
        }
      });
    case recipeConstants.MODIFY_RECIPE_LIST:
      return Object.assign({}, state, {
        [action.name]: state[action.name].map((item, index) =>
          index === action.index ? action.value : item
        )
      });
    case recipeConstants.MODIFY_RECIPE_ORDER:
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case recipeConstants.ADD_RECIPE_LIST_ITEM:
      let newListAdd = state[action.name].concat([""]);
      return Object.assign({}, state, {
        [action.name]: newListAdd
      });
    case recipeConstants.DELETE_RECIPE_LIST_ITEM:
      let newListDelete = [...state[action.name]];
      newListDelete.splice(action.index, 1);
      return Object.assign({}, state, {
        [action.name]: newListDelete
      });
    case recipeConstants.GET_RECIPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case recipeConstants.GET_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.recipe
      });
    case recipeConstants.GET_RECIPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

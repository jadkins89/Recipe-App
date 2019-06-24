import { combineReducers } from 'redux';
import authentication from './authentication.reducer'
import alerts from './alert.reducer.js'

export default combineReducers({
  authentication,
  alerts
});
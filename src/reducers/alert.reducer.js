import shortid from 'shortid';
import { alertConstants } from '../constants'; 

export default(state = [], action = {}) => {
  switch(action.type) {
    case alertConstants.ADD_ALERT:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    case alertConstants.DELETE_ALERT:
      return state.filter(message => message.id !== action.id);
    case alertConstants.CLEAR_ALERT:
      return []
    default: return state;
  }
}
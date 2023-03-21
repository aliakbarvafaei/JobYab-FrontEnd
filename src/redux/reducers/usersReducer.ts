import { Action } from '../actions';

const ActionType = {
  LOGIN : 'login',
  LOGOUT : 'logout',
}

interface state {
  user: null | string;
  token: null | string;
}

const initialState = {
  user: null,
  token: null,
};

const reducer = (
  state : state = initialState,
  action : Action
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { user: action.payload[0], token: action.payload[1]} as state;
    case ActionType.LOGOUT:
      return { user: null, token: null} as state;
    default:
      return state;
  }
};

export default reducer;
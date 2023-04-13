import { Action } from "../actions";

const ActionType = {
  LOGIN: "login",
  LOGOUT: "logout",
};

interface state {
  role: undefined | null | string;
  token: undefined | null | string;
}

const initialState = {
  role: undefined,
  token: undefined,
};

const reducer = (state: state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        role: action.payload[0],
        token: action.payload[1],
      } as state;
    case ActionType.LOGOUT:
      return {
        role: null,
        token: null,
      } as state;
    default:
      return state;
  }
};

export default reducer;

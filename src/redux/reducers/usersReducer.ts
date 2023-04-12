import { Action } from "../actions";

const ActionType = {
  LOGINUSER: "loginuser",
  LOGOUTUSER: "logoutuser",
  LOGINCOMPANY: "logincompany",
  LOGOUTCOMPANY: "logoutcompany",
};

interface state {
  user: null | string;
  tokenUser: null | string;
  company: null | string;
  tokenCompany: null | string;
}

const initialState = {
  user: null,
  tokenUser: null,
  company: null,
  tokenCompany: null,
};

const reducer = (state: state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGINUSER:
      return {
        user: action.payload[0],
        tokenUser: action.payload[1],
        company: state.company,
        tokenCompany: state.tokenCompany,
      } as state;
    case ActionType.LOGOUTUSER:
      return {
        user: null,
        tokenUser: null,
        company: state.company,
        tokenCompany: state.tokenCompany,
      } as state;
    case ActionType.LOGINCOMPANY:
      return {
        user: state.user,
        tokenUser: state.tokenUser,
        company: action.payload[0],
        tokenCompany: action.payload[1],
      } as state;
    case ActionType.LOGOUTCOMPANY:
      return {
        user: state.user,
        tokenUser: state.tokenUser,
        company: null,
        tokenCompany: null,
      } as state;
    default:
      return state;
  }
};

export default reducer;

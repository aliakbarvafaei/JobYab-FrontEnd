import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../actions';

enum ActionType {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // dispatch({
    //   type: ActionType.SEARCH_REPOSITORIES,
    // });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
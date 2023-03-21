import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const reducers = combineReducers({
  userAuth: usersReducer,
});

export default reducers;

// export type RootState = ReturnType<typeof reducers>;
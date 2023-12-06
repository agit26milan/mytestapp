import {combineReducers} from '@reduxjs/toolkit';
import FavoriteReducer from './favorite/reducer';
const appReducer = combineReducers({
  favorite: FavoriteReducer,
});
const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.

  return appReducer(state, action);
};

export default rootReducer;

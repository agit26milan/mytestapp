import {ADD_TO_FAVORITE, REMOVE_FAVORITE} from '../../types';

export const saveToFavorite = (payload: Home.ResponseSubMenu) => ({
  type: ADD_TO_FAVORITE,
  payload,
});

export const removeFromFavorite = (payload: Home.ResponseSubMenu) => ({
  type: REMOVE_FAVORITE,
  payload,
});

import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromFavorite,
  saveToFavorite,
} from '../redux/action/favorite/action';
import {RootState} from '../redux';

const useFavorite = () => {
  const listFav = useSelector((state: RootState) => state.favorite.data);
  const dispatch = useDispatch();
  const onSaveFavorite = (selectProduct: Home.ResponseSubMenu) => {
    if (selectProduct) {
      dispatch(saveToFavorite(selectProduct));
    }
  };

  const onRemoveFavorite = (selectedProduct: Home.ResponseSubMenu) => {
    if (selectedProduct) {
      dispatch(removeFromFavorite(selectedProduct));
    }
  };

  const checkIsOnFavorite = (id?: string) => {
    const findINdex = listFav.findIndex(
      (data: Home.ResponseSubMenu) => data.product.id === id,
    );
    return findINdex > -1;
  };

  return {
    onSaveFavorite,
    checkIsOnFavorite,
    onRemoveFavorite,
  };
};

export default useFavorite;

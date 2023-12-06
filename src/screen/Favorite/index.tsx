import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import Product from '../Home/Product';
import ModalProduct from '../Home/ModalProduct';
import useFavorite from '../../hooks/useFavorite';

const FavoriteScreen = () => {
  const listFavorite = useSelector((state: RootState) => state.favorite.data);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const {onSaveFavorite, onRemoveFavorite} = useFavorite();
  const [selectProduct, setSelectProduct] =
    React.useState<Home.ResponseSubMenu | null>(null);

  const onClickProduct = (product: Home.ResponseSubMenu) => {
    setOpenModal(true);
    setSelectProduct(product);
  };

  const onSaveFavoriteHandle = () => {
    if (selectProduct) {
      onSaveFavorite(selectProduct);
    }
  };

  const renderItem = ({item}: any) => (
    <Product item={item} numColumn={3} onPress={onClickProduct} />
  );

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <View style={styles.containerMenu}>
      <FlatList numColumns={3} data={listFavorite} renderItem={renderItem} />
      <ModalProduct
        isVisible={openModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        onSaveFavoriteHandle={onSaveFavoriteHandle}
        selectProduct={selectProduct}
        hideFavoriteBtn={true}
        onRemoveFavorite={onRemoveFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu: {
    paddingTop: 20,
    backgroundColor: 'white',
    flex: 1,
  },
});

export default FavoriteScreen;

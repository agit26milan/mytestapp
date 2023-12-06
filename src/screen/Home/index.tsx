import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getSublistMenu} from '../../api';
import {COMPANY_ID} from '../../constant';
import Product from './Product';
import ModalProduct from './ModalProduct';
import useFavorite from '../../hooks/useFavorite';
import {useNavigation} from '@react-navigation/native';
import Love from '../../assets/images/favourite.png';

const HomeScreen = (props: any) => {
  const {route} = props;
  const [listSubMenu, setListSubMenu] = React.useState<Home.ResponseSubMenu[]>(
    [],
  );
  const {navigate} = useNavigation();
  const {onSaveFavorite, onRemoveFavorite} = useFavorite();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectProduct, setSelectProduct] =
    React.useState<Home.ResponseSubMenu | null>(null);
  const getSubListCategory = async () => {
    try {
      setLoading(true);
      const response = await getSublistMenu(COMPANY_ID, route.params.id);
      const {data} = response;
      setListSubMenu(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onPullRefresh = () => {
    getSubListCategory();
  };

  const onClickProduct = (product: Home.ResponseSubMenu) => {
    setOpenModal(true);
    setSelectProduct(product);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    if (route.params?.id) {
      getSubListCategory();
    }
  }, [route.params]);

  const onSaveFavoriteHandle = () => {
    if (selectProduct) {
      onSaveFavorite(selectProduct);
    }
  };

  const renderItem = ({item}: any) => (
    <Product item={item} numColumn={3} onPress={onClickProduct} />
  );

  const goToFavoritePage = () => {
    navigate('Favorite');
  };

  return (
    <View style={styles.containerMenu}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullRefresh} />
        }
        data={listSubMenu}
        renderItem={renderItem}
        numColumns={3}
      />
      <ModalProduct
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        isVisible={openModal}
        useNativeDriver={true}
        selectProduct={selectProduct}
        onSaveFavoriteHandle={onSaveFavoriteHandle}
        onRemoveFavorite={onRemoveFavorite}
      />
      <View>
        <TouchableOpacity style={styles.floatButton} onPress={goToFavoritePage}>
          <Image source={Love} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMenu: {
    paddingTop: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 10,
  },
  productNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: '#06c',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  floatButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 25,
  },
});

export default React.memo(HomeScreen);

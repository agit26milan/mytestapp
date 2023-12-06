import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
import {getSublistMenu} from '../../api';
import {COMPANY_ID} from '../../constant';
import Product from './Product';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = (props: any) => {
  const {route} = props;
  const [listSubMenu, setListSubMenu] = React.useState<Home.ResponseSubMenu[]>(
    [],
  );
  const {navigate} = useNavigation();

  const [loading, setLoading] = React.useState<boolean>(false);

  const getSubListCategory = async (isShowAlert?: boolean) => {
    try {
      setLoading(true);
      const response = await getSublistMenu(COMPANY_ID, route.params.id);
      const {data} = response;
      setListSubMenu(data.data);
      setLoading(false);
    } catch (e) {
      if (isShowAlert) {
        Alert.alert('Error', 'Something wrong please try again');
      }
      setLoading(false);
    }
  };

  const onPullRefresh = () => {
    getSubListCategory();
  };

  const onClickProduct = (product: Home.ResponseSubMenu) => {
    navigate('ProductDetail' as never, {product});
  };

  React.useEffect(() => {
    if (route.params?.id) {
      getSubListCategory(true);
    }
  }, [route.params]);

  const renderItem = ({item}: any) => (
    <Product item={item} numColumn={3} onPress={onClickProduct} />
  );

  return (
    <View style={styles.containerMenu}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullRefresh} />
        }
        data={listSubMenu}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
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

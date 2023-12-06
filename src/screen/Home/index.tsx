import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
import {getSublistMenu} from '../../api';
import {COMPANY_ID} from '../../constant';
import Product from './Product';
import {useNavigation} from '@react-navigation/native';
import Search from '../../components/Search';

const HomeScreen = (props: any) => {
  const {route} = props;
  const [listSubMenu, setListSubMenu] = React.useState<Home.ResponseSubMenu[]>(
    [],
  );
  const [searchText, setSearchText] = React.useState<string | null>(null);
  const [tempSearch, setTempSearch] = React.useState<Home.ResponseSubMenu[]>(
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

  const onSearch = (text: string) => {
    if (text.length >= 3) {
      setSearchText(text);
      onFilterProduct(text);
    } else {
      setSearchText(null);
      setTempSearch([]);
    }
  };
  const onFilterProduct = (text: string) => {
    const filterProductt = listSubMenu.filter(data =>
      data.name.toLowerCase().includes(text.toLowerCase()),
    );
    setTempSearch(filterProductt);
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
      <View style={styles.searchContent}>
        <Search onChangeText={onSearch} placeholder="Search" />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullRefresh} />
        }
        data={searchText?.length > 0 ? tempSearch : listSubMenu}
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
  searchContent: {
    paddingHorizontal: 10,
  },
});

export default React.memo(HomeScreen);

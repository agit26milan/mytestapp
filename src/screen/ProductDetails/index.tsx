import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {formatMoney} from '../../utils';
import useFavorite from '../../hooks/useFavorite';
import {useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
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
  unfavoriteButton: {
    backgroundColor: 'red',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

const ProductDetails = () => {
  const {params}: any = useRoute();
  const [selectProduct, setSelectProduct] =
    React.useState<Home.ResponseSubMenu | null>(null);

  React.useEffect(() => {
    if (params?.product) {
      setSelectProduct(params.product);
    }
  }, [JSON.stringify(params)]);

  return (
    <View style={styles.containerModal}>
      <Image
        style={{height: 400}}
        source={{uri: selectProduct?.product.defaultImageURL}}
        testID="image"
      />
      <View style={styles.mainContainer}>
        <Text testID="productName" style={styles.productNameText}>
          {selectProduct?.product.name}
        </Text>
        <Text testID="description" style={styles.descriptionText}>
          {selectProduct?.product.description}
        </Text>
        <Text testID="price" style={styles.priceText}>
          $ {formatMoney(String(selectProduct?.product.retailPrice))}{' '}
        </Text>
      </View>
    </View>
  );
};

export default ProductDetails;

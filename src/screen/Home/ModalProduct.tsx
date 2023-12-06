import React from 'react';
import ModalGlobal from '../../components/ModalGlobal';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {formatMoney} from '../../utils';
import useFavorite from '../../hooks/useFavorite';

const ModalProduct: React.FC<Modal.ModalProduct> = props => {
  const {selectProduct} = props;
  const {checkIsOnFavorite} = useFavorite();
  const onSave = () => {
    if (props.onSaveFavoriteHandle && selectProduct) {
      props.onSaveFavoriteHandle(selectProduct);
    }
  };

  const onRemove = () => {
    if (props.onRemoveFavorite && selectProduct) {
      props.onRemoveFavorite(selectProduct);
    }
  };

  return (
    <ModalGlobal {...props}>
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

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          {checkIsOnFavorite(selectProduct?.product.id) ? (
            <TouchableOpacity
              onPress={onRemove}
              style={styles.unfavoriteButton}>
              <Text style={{color: 'white'}}>Remove favorite</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSave} style={styles.favoriteButton}>
              <Text style={{color: 'white'}}>Add to favorite</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ModalGlobal>
  );
};

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

export default ModalProduct;

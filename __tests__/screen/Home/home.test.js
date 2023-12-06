import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Home from '../../../src/screen/Home';
import ReduxProvider from '../../../src/reduxTest';
import {store} from '../../../src/redux';
import Product from '../../../src/screen/Home/Product';
import useFavorite from '../../../src/hooks/useFavorite';
import ModalProduct from '../../../src/screen/Home/ModalProduct';

const mockApi = {
  name: 'Seaweed',
  sequence: 1,
  itemType: 'PRODUCT',
  id: '1645669665888',
  productID: 'product::1305bdc4-f9f7-4fc0-b6cc-7da7aeec863a',
  product: {
    id: '1305bdc4-f9f7-4fc0-b6cc-7da7aeec863a',
    name: 'Seaweed',
    description: 'Seaweed nori, lightly salted. A delicious healthy option.',
    retailPrice: 10000000,
    categoryName: 'PRETZELS',
    defaultImageURL:
      'https://cdn-bucket-file-manager.s3.ap-southeast-1.amazonaws.com/Upload/e902cee7-6650-447e-989a-9209944192fc/product/e79e0ffd-d0e8-4a69-9080-b78526de3d91.jpg',
    orderingStatus: 'AVAILABLE',
    code: 'PRD0000012',
    promotions: [],
    orderingAvaibility: {
      storePickUp: true,
      delivery: true,
      storeCheckOut: true,
      takeAway: true,
      dineIn: true,
    },
  },
};

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      id: '123',
    },
  }),
}));

jest.mock('../../../src/api');

describe('it should be match with snapshot', () => {
  const wrapper = ({children}) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );
  it('Home Code should be not change', () => {
    const {toJSON} = render(<Home route={{params: '123'}} />, {wrapper});
    expect(toJSON).toMatchSnapshot();
  });

  it('product list should correct', async () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(
      <Product item={mockApi} onPress={mockPress} />,
      {wrapper},
    );
    await fireEvent.press(getByTestId('buttonPress'));
    expect(mockPress).toHaveBeenCalledTimes(1);
    expect(getByTestId('image').props.source.uri).toEqual(
      mockApi.product.defaultImageURL,
    );
    expect(getByTestId('product-name').props.children).toEqual(
      mockApi.product.name,
    );
    expect(getByTestId('money').props.children).toEqual([
      '$ ',
      '10.000.000',
      ' ',
    ]);
  });

  it('Modal Product should correct', async () => {
    const {getByTestId} = render(
      <ModalProduct selectProduct={mockApi} isVisible={true} />,
      {wrapper},
    );
    expect(getByTestId('image').props.source.uri).toEqual(
      mockApi.product.defaultImageURL,
    );
    expect(getByTestId('productName').props.children).toEqual(
      mockApi.product.name,
    );
    expect(getByTestId('description').props.children).toEqual(mockApi.product.description);
    expect(getByTestId('price').props.children).toEqual([
      '$ ',
      '10.000.000',
      ' ',
    ]);
  });
});

// <View style={styles.containerModal}>
//   <Image
//     style={{height: 400}}
//     source={{uri: selectProduct?.product.defaultImageURL}}
//     testID="image"
//   />
//   <View style={styles.mainContainer}>
//     <Text testID="productName" style={styles.productNameText}>
//       {selectProduct?.product.name}
//     </Text>
//     <Text testID="description" style={styles.descriptionText}>
//       {selectProduct?.product.description}
//     </Text>
//     <Text testID="price" style={styles.priceText}>
//       $ {formatMoney(String(selectProduct?.product.retailPrice))}{' '}
//     </Text>
//   </View>

//   <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
//     {checkIsOnFavorite(selectProduct?.product.id) ? (
//       <TouchableOpacity
//         onPress={onRemove}
//         style={styles.unfavoriteButton}>
//         <Text style={{color: 'white'}}>Remove favorite</Text>
//       </TouchableOpacity>
//     ) : (
//       <TouchableOpacity onPress={onSave} style={styles.favoriteButton}>
//         <Text style={{color: 'white'}}>Add to favorite</Text>
//       </TouchableOpacity>
//     )}
//   </View>
// </View>

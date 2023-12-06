import React from 'react';
import {render} from '@testing-library/react-native';
import Favorite from '../../../src/screen/Favorite';
import ReduxProvider from '../../../src/reduxTest';
import {store} from '../../../src/redux';

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

describe('Favorite should be match with snapshot', () => {
  const wrapper = ({children}) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );
  it('Code should be not change', () => {
    const {toJSON} = render(<Favorite />, {wrapper});
    expect(toJSON).toMatchSnapshot();
  });
});

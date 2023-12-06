import React from 'react';
import {Provider} from 'react-redux';

type RedusProviderProps = {
  children: React.ReactNode;
  reduxStore: any;
};

const ReduxProvider: React.FC<RedusProviderProps> = ({
  children,
  reduxStore,
}) => <Provider store={reduxStore}>{children}</Provider>;

export default ReduxProvider;

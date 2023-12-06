import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from './TopTab';
import ProductDetails from '../screen/ProductDetails';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false, title: 'Home'}}
        name="BottomTab"
        component={Tab}
      />
      <Stack.Screen
        options={{title: 'Product Detail'}}
        name="ProductDetail"
        component={ProductDetails}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

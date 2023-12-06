import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from './TopTab';
import FavoriteScreen from '../screen/Favorite';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTab"
        component={Tab}
      />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

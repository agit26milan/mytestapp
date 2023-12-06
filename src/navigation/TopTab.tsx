import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../screen/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useMenuNavigation from './hooks/useMenuNavigation';

const Tab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  const {getListCategory, listMenu} = useMenuNavigation();
  const {top} = useSafeAreaInsets();
  React.useEffect(() => {
    getListCategory();
  }, []);

  return (
    <>
      {listMenu.length > 0 ? (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle: {backgroundColor: '#06c'},
            // tabBarItemStyle: {height: 100},
            tabBarStyle: {paddingTop: Math.max(top)},
            tabBarLabelStyle: {
              textTransform: 'capitalize',
              fontSize: 13,
            },
          }}>
          {listMenu.map((value, index) => (
            <Tab.Screen
              key={index}
              name={value.name}
              initialParams={value}
              component={HomeScreen}
            />
          ))}
        </Tab.Navigator>
      ) : null}
    </>
  );
};

export default TopNavigation;

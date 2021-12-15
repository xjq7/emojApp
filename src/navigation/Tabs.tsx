import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Home from '@pages/tab/home';
import Emoj from '@pages/tab/emoj';
import themeMap from '@utils/themeMap';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          color = focused ? themeMap.$Primary : themeMap.$BlackS;
          if (route.name === 'home') {
            return (
              <IoniconsIcon name="ios-home-outline" size={size} color={color} />
            );
          } else if (route.name === 'emoj') {
            return <FontAwesomeIcon name="smile-o" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: themeMap.$Primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -3,
          marginBottom: 3,
        },
      })}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: '首页',
          headerTitle: '首页',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="emoj"
        component={Emoj}
        options={{
          tabBarLabel: 'Emoj',
          headerTitle: '小表情',
        }}
      />
    </Tab.Navigator>
  );
}

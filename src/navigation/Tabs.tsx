import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Home from '@pages/tab/home';
import Emoj from '@pages/tab/emoj';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';
          if (route.name === 'home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            return <IoniconsIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'emoj') {
            return <FontAwesomeIcon name="smile-o" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -3,
          marginBottom: 3,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: '首页',
        }}
      />
      <Tab.Screen
        name="emoj"
        component={Emoj}
        options={{
          tabBarLabel: 'Emoj',
        }}
      />
    </Tab.Navigator>
  );
}

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import Home from '@pages/tab/home';
import Setting from '@pages/tab/setting';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Settings"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'add-circle-sharp' : 'add-circle-sharp';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'add-circle-sharp' : 'add-circle-sharp';
            }

            // You can return any component that you like here!
            return <IoniconsIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Setting}
          options={{
            tabBarLabel: 'Settings',
            tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

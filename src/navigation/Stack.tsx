import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from './Tabs';
import Setting from '@pages/tab/setting';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Tab" component={Tab} options={{headerShown: false}} />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default StackScreen;

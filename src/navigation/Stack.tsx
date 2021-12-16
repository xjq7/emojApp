import React from 'react';
import Tab from './Tabs';
import Setting from '@pages/tab/setting';
import Launch from '@pages/launch';
import Login from '@pages/login';
import EmojSearch from '@pages/emojSearch';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  home: undefined;
  launch: undefined;
  setting: undefined;
  login: undefined;
  emoj: undefined;
  emojSearch: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}} initialRouteName="launch">
        <Stack.Screen
          name="launch"
          options={{headerShown: false}}
          component={Launch}
        />
        <Stack.Screen
          name="home"
          options={{headerShown: false}}
          component={Tab}
        />
        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen
          name="emojSearch"
          options={{headerTitle: '搜索'}}
          component={EmojSearch}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackScreen;

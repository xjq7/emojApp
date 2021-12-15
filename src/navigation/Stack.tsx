import React from 'react';
import Tab from './Tabs';
import Setting from '@pages/tab/setting';
import Launch from '@pages/launch';
import Login from '@pages/login';
import {NavigationContainer} from '@react-navigation/native';
import createInterceptStack from './InterceptStack';

export type RootStackParamList = {
  home: undefined;
  launch: undefined;
  setting: undefined;
  login: undefined;
  emoj: undefined;
};

const Stack = createInterceptStack<RootStackParamList>();

const StackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="launch">
        <Stack.Screen name="launch" component={Launch} />
        <Stack.Screen name="home" component={Tab} />
        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackScreen;

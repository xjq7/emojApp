import React, {useEffect} from 'react';
import Tab from './Tabs';
import Setting from '@pages/tab/setting';
import Launch from '@pages/launch';
import Login from '@pages/login';
import EmojDetail from '@pages/emojDetail';
import EmojSearch from '@pages/emojSearch';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './utils';

export type RootStackParamList = {
  home: undefined;
  launch: undefined;
  setting: undefined;
  login: undefined;
  emoj: undefined;
  emojSearch: undefined;
  emojDetail: {id: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const StackScreen = () => {
  return (
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen
          name="emojDetail"
          options={{headerTitle: '详情'}}
          component={EmojDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackScreen;

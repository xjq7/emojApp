import React, {useState} from 'react';
import Container from '@components/Container';
import themeMap from '@utils/themeMap';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import EmojList from './components/EmojList';

const renderScene = SceneMap({
  hot: () => <EmojList />,
  new: () => <EmojList />,
});

export default function HomeScreen() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'hot', title: '热门'},
    {key: 'new', title: '最新'},
  ]);

  return (
    <Container>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={{
              backgroundColor: themeMap.$White,
            }}
            labelStyle={{color: themeMap.$BlackS}}
            activeColor={themeMap.$Primary}
            inactiveColor={themeMap.$BlackS}
          />
        )}
        style={{backgroundColor: themeMap.$PageBg}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </Container>
  );
}

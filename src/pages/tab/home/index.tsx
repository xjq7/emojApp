import React, {useState} from 'react';
import Container from '@components/Container';
import themeMap from '@utils/themeMap';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import EmojList from './components/EmojList';
import {GetEmojBodyType} from '@services/emoj';
import Search from './components/Search';

const renderScene = SceneMap({
  hot: () => <EmojList type={GetEmojBodyType.hot} />,
  new: () => <EmojList type={GetEmojBodyType.new} />,
  group: () => <EmojList type={GetEmojBodyType.new} />,
});

export default function HomeScreen() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'hot', title: '热门'},
    {key: 'new', title: '最新'},
    {key: 'group', title: '表情包'},
  ]);

  return (
    <Container headerHide={true}>
      <Search />
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

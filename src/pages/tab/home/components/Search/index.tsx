import React from 'react';
import {Text} from 'react-native';
import {Divider, PressView} from '@components/index';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

function Search() {
  const navigation = useNavigation();
  const handleSearch = () => {
    navigation.navigate('emojSearch');
  };

  return (
    <>
      <PressView bounce={false} style={styles.container} onPress={handleSearch}>
        <Text style={styles.label}>搜索</Text>
      </PressView>
      <Divider height={20} />
    </>
  );
}

export default Search;

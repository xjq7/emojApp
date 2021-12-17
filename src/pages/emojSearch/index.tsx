import React, {useState} from 'react';
import {Container, Divider, TextInput} from '@components/index';
import EmojList from '@pages/tab/home/components/EmojList';
import styles from './styles';
import {debounce} from 'lodash';

function EmojSearch() {
  const [name, setName] = useState('');

  const handleNameChange = (val: string) => {
    setName(val);
  };

  return (
    <Container hasHeader={true}>
      <Divider height={10} />
      <TextInput
        onChangeText={debounce(handleNameChange, 1000)}
        placeholder="请输入表情名"
        style={styles.input}
      />
      <EmojList name={name} />
    </Container>
  );
}

export default EmojSearch;

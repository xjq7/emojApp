import {Dimensions} from 'react-native';
// import _ from 'lodash';
const designWidth = 750;
const deviceWidth = Dimensions.get('window').width;
const scalePx = (size: number) => {
  if (size && size > 1) {
    return (deviceWidth / designWidth) * size;
  } else {
    return size;
  }
};
export default scalePx;

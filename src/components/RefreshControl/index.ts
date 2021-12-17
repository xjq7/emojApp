import {isAndroid} from '@utils/platform';
import A from './index.android';
import I from './index.ios';

export default isAndroid ? A : I;

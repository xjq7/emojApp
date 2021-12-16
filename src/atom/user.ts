import {atom} from 'recoil';

export const userInfoAtom = atom({
  key: 'userInfoAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

interface Token {
  token?: string;
  expires?: number;
}

export const tokenAtom = atom<Token>({
  key: 'tokenAtom',
  default: {},
});

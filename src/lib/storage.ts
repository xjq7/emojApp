import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = function (key: string, obj: any) {
  AsyncStorage.setItem(key, JSON.stringify(obj));
};

const getItem = AsyncStorage.getItem;
const removeItem = AsyncStorage.removeItem;
const mergeItem = AsyncStorage.mergeItem;
const clear = AsyncStorage.clear;
const getAllKeys = AsyncStorage.getAllKeys;

export default {getItem, setItem, removeItem, mergeItem, clear, getAllKeys};

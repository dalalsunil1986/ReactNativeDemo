import {AsyncStorage} from 'react-native';

const appTokenKey = 'appToken';
export const getAppToken = () => AsyncStorage.getItem(appTokenKey);
export const saveAppToken = user => AsyncStorage.setItem(appTokenKey, user);
export const removeAppToken = () => AsyncStorage.removeItem(appTokenKey);
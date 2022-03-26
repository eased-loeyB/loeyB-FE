import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AsyncStorageKeys {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  ExpiresIn = 'expires_in',
}

export let token = '';

const saveValue = async (
  key: string,
  value?: string | null,
): Promise<boolean> => {
  try {
    if (typeof value === 'string' && value !== '') {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
    return true;
  } catch (err) {
    return false;
  }
};

const loadValue = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    return null;
  }
};

const removeValue = async (key: string): Promise<void | null> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (err) {
    return null;
  }
};

export const saveAccessToken = async (_token?: string | null) =>
  saveValue(AsyncStorageKeys.AccessToken, _token);

export const loadAccessToken = async () => {
  const res = await loadValue(AsyncStorageKeys.AccessToken);
  token = res ?? '';
  return res;
};

export const removeAccessToken = async () =>
  await removeValue(AsyncStorageKeys.AccessToken);

export const saveRefreshToken = (_token?: string | null) =>
  saveValue(AsyncStorageKeys.RefreshToken, _token);

export const loadRefreshToken = async () =>
  loadValue(AsyncStorageKeys.RefreshToken);

export const removeRefreshToken = async () =>
  removeValue(AsyncStorageKeys.RefreshToken);

export const saveExpiresIn = async (time?: string | null) =>
  saveValue(AsyncStorageKeys.ExpiresIn, time);

export const removeExpiresIn = async () => {
  await removeValue(AsyncStorageKeys.ExpiresIn);
};

export const loadExpiresIn = async () => {
  const result = await AsyncStorage.getItem(AsyncStorageKeys.ExpiresIn);
  return result;
};

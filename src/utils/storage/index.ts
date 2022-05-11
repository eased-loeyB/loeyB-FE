import AsyncStorage from '@react-native-async-storage/async-storage'

export enum AsyncStorageKeys {
  CustomerAccessToken = 'customer_access_token',
  CustomerRefreshToken = 'customer_refresh_token',
  CustomerExpiresIn = 'customer_expires_in',
}

export let token = ''

// If a valid string is passed then only it is stored, else key is removed
const saveValue = async (key: string, value?: string | null): Promise<boolean> => {
  try {
    if (typeof value === 'string' && value !== '') {
      await AsyncStorage.setItem(key, value)
    } else {
      await AsyncStorage.removeItem(key)
    }

    return true
  } catch (e) {
    // saving error
    return false
  }
}

const loadValue = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    // error reading value
    return null
  }
}

async function removeValue(key: string): Promise<void | null> {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (exception) {
    return null
  }
}

export const saveCustomerToken = async (token?: string | null) =>
  saveValue(AsyncStorageKeys.CustomerAccessToken, token)
export const loadCustomerToken = async () => {
  const res = await loadValue(AsyncStorageKeys.CustomerAccessToken)
  token = res ?? ''
  return res
}

export const removeCustomerToken = async () =>
  await removeValue(AsyncStorageKeys.CustomerAccessToken)

export const saveRefreshToken = (token?: string | null) =>
  saveValue(AsyncStorageKeys.CustomerRefreshToken, token)

export const loadRefreshToken = async () => loadValue(AsyncStorageKeys.CustomerRefreshToken)

export const removeRefreshToken = async () => removeValue(AsyncStorageKeys.CustomerRefreshToken)

export const saveExpiresIn = async (time?: string | null) => saveValue(AsyncStorageKeys.CustomerExpiresIn, time)

export const removeExpiresIn = async () => {
  await removeValue(AsyncStorageKeys.CustomerExpiresIn)
}
export const loadExpiresIn = async () => {
  const result = await AsyncStorage.getItem(AsyncStorageKeys.CustomerExpiresIn)
  return result
}

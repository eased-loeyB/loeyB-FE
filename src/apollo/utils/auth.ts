import {AuthData} from '~/models/Auth';
import {
  removeAccessToken,
  saveExpiresIn,
  saveRefreshToken,
} from '~/utils/asyncstorage';
import {saveCustomerToken} from '~/utils/storage';

import {cache} from '../cache';
import {IS_LOGGED_IN} from '../queries/auth';

export function onLogin() {
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: true,
      isLoginExpired: false,
    },
  });
}

export async function onLogout() {
  await removeAccessToken();
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: false,
      isLoginExpired: true,
    },
  });
}

export async function saveToken({
  accessToken,
  refreshToken,
  expiresIn,
}: AuthData) {
  await saveCustomerToken(accessToken);
  await saveRefreshToken(refreshToken);
  await saveExpiresIn(`${expiresIn}`);

  onLogin();
}

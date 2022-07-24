import {removeAccessToken} from '~/utils/asyncstorage';

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

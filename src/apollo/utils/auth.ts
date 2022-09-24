import {
  saveAccessToken,
  saveExpiresIn,
  saveRefreshToken,
} from '~/utils/asyncstorage';

import {Authentication} from '../generated';

export async function saveToken({
  accessToken,
  refreshToken,
  expiresIn,
}: Omit<Authentication, '__typename'>) {
  await saveAccessToken(accessToken);
  await saveRefreshToken(refreshToken);
  await saveExpiresIn(`${expiresIn}`);
}

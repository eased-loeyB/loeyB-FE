import {saveExpiresIn, saveRefreshToken} from '~/utils/asyncstorage';
import {saveCustomerToken} from '~/utils/storage';

import {Authentication} from '../generated';

export async function saveToken({
  accessToken,
  refreshToken,
  expiresIn,
}: Omit<Authentication, '__typename'>) {
  await saveCustomerToken(accessToken);
  await saveRefreshToken(refreshToken);
  await saveExpiresIn(`${expiresIn}`);
}

import {Authentication} from '~/models/Auth';
import {saveExpiresIn, saveRefreshToken} from '~/utils/asyncstorage';
import {saveCustomerToken} from '~/utils/storage';

export async function saveToken({
  accessToken,
  refreshToken,
  expiresIn,
}: Authentication) {
  await saveCustomerToken(accessToken);
  await saveRefreshToken(refreshToken);
  await saveExpiresIn(`${expiresIn}`);
}

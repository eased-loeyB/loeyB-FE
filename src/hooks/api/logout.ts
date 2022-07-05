import {useLazyQuery, useQuery} from '@apollo/client';
import {REMOVE_DEVICE_TOKEN} from '../../apollo/queries/auth';
import {getDeviceToken} from '../../services/notifications';
import {disConnectSubscription} from '../../apollo/client';
import {LoeybUserResponse} from '../../models/User';
import {FETCH_LOEYB_USER} from '../../apollo/queries/profile';
import {isIOS, removeAccessToken} from '../../utils';
//import notifee from '@notifee/react-native';

export const useLogout = () => {
  const [removeDeviceToken] = useLazyQuery(REMOVE_DEVICE_TOKEN);
  const {data: loeybUser} =
    useQuery<{fetchLoeybUser: LoeybUserResponse}>(FETCH_LOEYB_USER);

  const logout = async () => {
    if (isIOS()) {
      //  notifee.setBadgeCount(0);
    }
    await removeDeviceToken({
      variables: {
        email: loeybUser?.fetchLoeybUser.data.email ?? '',
        deviceToken: await getDeviceToken(),
      },
    });
    // remove device token
    /* await messaging().deleteToken() */
    disConnectSubscription();
    await removeAccessToken();
  };
  return {removeDeviceToken, logout};
};

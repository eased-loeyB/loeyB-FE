import {request, requestMultiple, RESULTS} from 'react-native-permissions';
import _ from 'lodash';

export async function checkMultiplePermissions(permissions: any[]) {
  if (_.isEmpty(permissions)) {
    return true;
  }
  let isPermissionGranted = false;
  const statuses = await requestMultiple(permissions);

  for (var index in permissions) {
    if (
      // @ts-ignore
      [RESULTS.LIMITED, RESULTS.GRANTED].includes(statuses[permissions[index]])
    ) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}

export async function checkPermission(permission: any) {
  var isPermissionGranted = false;
  const result = await request(permission);

  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
    case RESULTS.LIMITED:
      isPermissionGranted = true;
      break;
  }
  return isPermissionGranted;
}

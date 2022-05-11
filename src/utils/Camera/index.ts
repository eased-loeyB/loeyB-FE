import {Alert, Platform} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera, launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {PERMISSIONS} from 'react-native-permissions';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {isAndroid11orHigher} from '../device';
import uuid from 'react-native-uuid';
import {checkMultiplePermissions} from '../Permissions';

export interface FileAttachment {
  id: string;
  uri: string;
  size: string;
  name: string;
  type: string;
}

const callback = (
  imagePickerRes: ImagePickerResponse,
  callbackResult: (result: FileAttachment[]) => void,
) => {
  console.log("call back");
  const {didCancel, errorCode, errorMessage, assets} = imagePickerRes;
  // handle errorss
  switch (errorCode) {
    case 'camera_unavailable': {
      Alert.alert('Camera Errors', 'Camera unavailable in this device!');
      return;
    }
    case 'permission': {
      Alert.alert('Camera Errors', 'Permission denies!');
      return;
    }
    case 'others': {
      Alert.alert('Camera Errors', 'Something wrong!');
      return;
    }
  }
  console.log('puit', imagePickerRes);
  const result = (imagePickerRes.assets ?? []).map(item => {
    return {
      id: uuid.v4(),
      uri: item.uri,
      size: `${item.fileSize}`,
      name: item.fileName,
      type: item.type,
    } as FileAttachment;
  });
  callbackResult(result);
};
const PERMISSION_CAMERA_ANDROID = isAndroid11orHigher()
  ? [PERMISSIONS.ANDROID.CAMERA]
  : [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ];
export async function OpenCamera(
  mediaType: MediaType = 'mixed',
  callbackResult: (result: FileAttachment[]) => void,
) {
  let permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
      : PERMISSION_CAMERA_ANDROID;

  const options: CameraOptions = {
    mediaType,
    saveToPhotos: true,
  };

  const permissionGranted = await checkMultiplePermissions(permissions);

  if (permissionGranted) {
    console.log("permissionGranted", permissionGranted);
    launchCamera(options, imagePickerRes => {
      console.log("Res", imagePickerRes);
      callback(imagePickerRes, callbackResult);
    }).then(temp => {
      console.log("launchImageLibrary", temp);
    }).catch(e => {
      console.log("log", e);
    });
    // openCamera(options).then((imagePickerRes) => {
    //   console.log("Res", imagePickerRes);
    //   callback(imagePickerRes, callbackResult);
    //
    // });
  } else {
    Alert.alert('Camera Errors', 'Permission denies!');
  }
}

type mediaType = 'photo' | 'video' | 'any';
const PERMISSION_IMAGE_ANDROID = isAndroid11orHigher()
  ? []
  : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

export async function ChooseMultiple(
  mediaType: mediaType,
  callbackResult: (result: FileAttachment[]) => void,
) {
  let permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.PHOTO_LIBRARY]
      : PERMISSION_IMAGE_ANDROID;

  const options: Options = {
    mediaType,
    multiple: true,
    maxFiles: 99,
  };

  const permissionGranted = await checkMultiplePermissions(permissions);

  if (permissionGranted) {
    let res = await ImagePicker.openPicker(options);

    let data: FileAttachment[] = [];
    // @ts-ignore
    for (let item of res) {
      data.push({
        id: uuid.v4(),
        uri: item.path,
        size: `${item.size}`,
        name: getFileNameFromPath(item.path),
        type: item.mime,
      } as FileAttachment);
    }
    callbackResult(data);
  } else {
    Alert.alert('Open Image Library', 'Permission denies!');
  }
}

import React from 'react';
import {ImageSourcePropType} from 'react-native';

import i18n from 'i18next';
import Toast from 'react-native-toast-message';

import {ERROR_ICON} from '~/assets';
import SnackBar from '~/components/SnackBar';

export const toastConfig = {
  custom_toast: ({text1, props}: any) => (
    <SnackBar text={text1} onClose={ToastService.close} {...props} />
  ),
};

export interface ToastProps {
  isError: boolean;
  message: string;
  onHide?: () => void;
  timeout?: number;
  icon?: ImageSourcePropType;
  bottomOffset?: number;
  autoHide?: boolean;
}

export class ToastServiceClass {
  show(props: ToastProps) {
    if (!props) {
      return;
    }
    const message = i18n.t(props.message);
    if (props.isError) {
      this.showError(message);
    } else {
      this.showSuccess(
        message,
        props.onHide,
        props.timeout,
        props.icon,
        props.bottomOffset,
        props.autoHide,
      );
    }
  }

  showSuccess(
    message: string,
    onHide?: () => void,
    timeout?: number,
    icon?: ImageSourcePropType,
    bottomOffset?: number,
    autoHide?: boolean,
  ) {
    return Toast.show({
      type: 'custom_toast',
      text1: message,
      position: 'bottom',
      visibilityTime: timeout || 3000,
      autoHide: autoHide ?? true,
      bottomOffset: bottomOffset || 40,
      onHide: onHide,
    });
  }

  showError(message: string, time?: number) {
    return Toast.show({
      type: 'custom_toast',
      position: 'bottom',
      text1: message || '',
      visibilityTime: time || 3000,
      autoHide: true,
      topOffset: 60,
      props: {error: true, icon: ERROR_ICON},
    });
  }

  close() {
    return Toast.hide();
  }
}

const ToastService = new ToastServiceClass();

export default ToastService;

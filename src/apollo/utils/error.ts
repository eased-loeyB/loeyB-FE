import {DeviceEventEmitter} from 'react-native';

import {ErrorHandler, ErrorResponse} from '@apollo/client/link/error';

import ToastService from '~/utils/ToastService';

import {LoeybErrorCode} from '../generated';
import {EventToken} from '../types/event';

export const isSuccessResponse = (result: LoeybErrorCode) => {
  return ['SUCCESS', 'success'].includes(result ?? '');
};

export const errorHandler: ErrorHandler = ({
  graphQLErrors,
  networkError,
  response,
  operation: {variables, operationName},
}: ErrorResponse) => {
  console.debug('operationName', operationName);
  console.debug('parameters', variables && JSON.stringify(variables));
  console.debug('response', response && JSON.stringify(response));

  if (graphQLErrors) {
    console.debug(
      'graphQLError',
      graphQLErrors && JSON.stringify(graphQLErrors),
    );
    graphQLErrors.forEach(async ({message}) => {
      let toastMessage: string;

      switch (message) {
        case EventToken.INVALID_TOKEN:
          DeviceEventEmitter.emit(message);
          toastMessage = 'commons.errors.token.invalid';
          break;
        case EventToken.TOKEN_EXPIRED:
          DeviceEventEmitter.emit(message);
          toastMessage = 'commons.errors.token.expired';
          break;
        default:
          toastMessage = 'commons.errors.default';
          break;
      }

      ToastService.show({
        isError: true,
        message: toastMessage,
      });
    });
  }

  if (networkError) {
    console.debug('networkError', networkError && JSON.stringify(networkError));
    ToastService.show({
      isError: true,
      message: 'commons.errors.network',
    });
  }
};

import {DeviceEventEmitter} from 'react-native';

import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {Middleware, SubscriptionClient} from 'subscriptions-transport-ws';

import {END_POINT, WSS_END_POINT} from '~/config/baseurl';
import {loadAccessToken} from '~/utils/asyncstorage';
import ToastService from '~/utils/ToastService';

import {cache} from './cache';
import {IS_LOGGED_IN} from './queries/auth';
import {EventToken} from './types/event';
import {onLogin, onLogout} from './utils/auth';

let _client: ApolloClient<NormalizedCacheObject>;
let webSocketClient: SubscriptionClient;

export async function getApolloClient(
  focusUpdate = false,
): Promise<ApolloClient<NormalizedCacheObject>> {
  if (_client && !focusUpdate) {
    return _client;
  }

  const accessToken = await loadAccessToken();

  if (accessToken) {
    onLogin();
  } else {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
        isLoginExpired: false,
      },
    });
  }

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      console.debug(
        'graphQLError',
        graphQLErrors && JSON.stringify(graphQLErrors),
      );
      graphQLErrors.forEach(async ({message}) => {
        let toastMessage: string;

        switch (message) {
          case EventToken.INVALID_TOKEN:
            await onLogout();
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
      console.debug(
        'networkError',
        networkError && JSON.stringify(networkError),
      );
      ToastService.show({
        isError: true,
        message: 'commons.errors.network',
      });
    }
  });

  const httpLink = ApolloLink.from([new HttpLink({uri: END_POINT})]);
  console.debug('HTTP Endpoint', END_POINT);

  webSocketClient = new SubscriptionClient(WSS_END_POINT, {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      return {Authorization: accessToken ? `Bearer ${accessToken}` : ''};
    },
  });

  const webSocketLink = new WebSocketLink(webSocketClient);
  console.debug('WebSocket Endpoint', WSS_END_POINT);

  const subscriptionAuthMiddleware: Middleware = {
    applyMiddleware: async (options, next) => {
      const _token = await loadAccessToken();
      options.headers = {
        authorization: _token ? `Bearer ${_token}` : '',
      };
      next();
    },
  };

  webSocketClient.use([subscriptionAuthMiddleware]);

  const authLink = setContext(async (_, {headers}) => {
    const __token = await loadAccessToken();
    return {
      headers: {
        ...headers,
        authorization: __token ? `Bearer ${__token}` : '',
      },
    };
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    webSocketLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: from([errorLink, authLink, splitLink]),
    cache,
  });

  _client = client;

  return client;
}

export async function disConnectSubscription() {
  if (_client) {
    await _client.clearStore();
    await _client.resetStore();
  }
  if (webSocketClient) {
    webSocketClient.close(true);
  }
}

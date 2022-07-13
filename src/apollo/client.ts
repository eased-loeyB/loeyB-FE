import {DeviceEventEmitter} from 'react-native';

import {ApolloClient, ApolloLink, from, HttpLink, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {SubscriptionClient} from 'subscriptions-transport-ws';

import {END_POINT, WSS_END_POINT} from '~/config/baseurl';
import {loadAccessToken, removeAccessToken} from '~/utils/asyncstorage';
import {TOKEN_EXPIRED} from '~/utils/Events';
import ToastService from '~/utils/ToastService';

import {cache} from './cache';
import {IS_LOGGED_IN} from './queries/isLoggedIn';

let _client: ApolloClient<any>;
let webSocketClient: SubscriptionClient;

export async function getApolloClient(
  focusUpdate = false,
): Promise<ApolloClient<any>> {
  if (_client && !focusUpdate) {
    return _client;
  }
  const token = await loadAccessToken();
  const accessToken = token || null;

  if (accessToken !== null) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
        isLoginExpired: false,
      },
    });
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
      graphQLErrors.forEach(({message}) => {
        async function autoLogout() {
          await removeAccessToken();
          cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
              isLoggedIn: false,
              isLoginExpired: true,
            },
          });
        }

        if (message === 'INVALID_TOKEN') {
          autoLogout();
        }
        if (message === 'TOKEN_EXPIRED') {
          DeviceEventEmitter.emit(TOKEN_EXPIRED);
        }
      });
    }
    console.log('networkError', networkError, graphQLErrors);
    if (networkError) {
      ToastService.show({
        isError: true,
        message: 'commons.networkError',
      });
    }
  });
  console.log('Endpoint', END_POINT);
  const httpLink = ApolloLink.from([new HttpLink({uri: END_POINT})]);

  webSocketClient = new SubscriptionClient(WSS_END_POINT, {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      return {Authorization: token ? `Bearer ${token}` : ''};
    },
  });

  const webSocketLink = new WebSocketLink(webSocketClient);

  const subscriptionAuthMiddleware = {
    applyMiddleware: async (options: any, next: any) => {
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

export const disConnectSubscription = async () => {
  if (_client) {
    await _client.clearStore();
    await _client.resetStore();
  }
  if (webSocketClient) {
    webSocketClient.close(true);
  }
};

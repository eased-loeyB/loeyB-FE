import {
  END_POINT,
  loadAccessToken,
  removeAccessToken,
  ToastService,
  WSS_END_POINT,
} from '../../utils';
import {ApolloClient, ApolloLink, from, HttpLink, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {IS_LOGGED_IN} from '../queries/isLoggedIn';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {cache} from '../cache';
import {DeviceEventEmitter} from 'react-native';
import {TOKEN_EXPIRED} from '../../utils';

let _client: ApolloClient<any>;
let webSocketClient: SubscriptionClient;

export async function getApolloClient(
  focusUpdate = false,
): Promise<ApolloClient<any>> {
  if (_client && !focusUpdate) {
    return _client;
  }
  const token = await loadAccessToken();
  const customerToken = token || null;

  if (customerToken !== null) {
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

  const errorLink = onError(errorResponse => {
    const {graphQLErrors, networkError, response, forward, operation} =
      errorResponse;
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
        } else if (message === 'TOKEN_EXPIRED') {
          DeviceEventEmitter.emit(TOKEN_EXPIRED);
        } else {
          console.log(
            'ERROR CLIENT',
            graphQLErrors,
            message,
            response,
            forward,
            operation,
          );
        }
      });
    }
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
      const user_token = await loadAccessToken();
      options.headers = {
        authorization: user_token ? `Bearer ${user_token}` : '',
      };
      next();
    },
  };

  webSocketClient.use([subscriptionAuthMiddleware]);

  const authLink = setContext(async (_, {headers}) => {
    const userToken = await loadAccessToken();
    return {
      headers: {
        ...headers,
        authorization: userToken ? `Bearer ${userToken}` : '',
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

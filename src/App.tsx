import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {ApolloClient, ApolloLink} from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApplicationNavigator} from './navigation';
// @ts-ignore
import apolloLogger from 'apollo-link-logger';
import {getApolloClient} from './apollo/client';
import {DeviceEventEmitter, LogBox, Platform} from 'react-native';
import 'dayjs/locale/ko';
import './translations';
import dayjs from 'dayjs';
import {create, toastConfig, UPDATE_TOKEN} from './utils';
import Toast from 'react-native-toast-message';
import {setCustomText} from 'react-native-global-props';
//import {Fonts} from './assets';
import store from './store';

ApolloLink.from([apolloLogger]);
LogBox.ignoreLogs([
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'new NativeEventEmitter()',
  'Warning: Cannot update a component (`ImageViewer`) while rendering a different component (`ImageViewer`)',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreAllLogs();
create();

const App = () => {
  const [client, setClient] = useState<ApolloClient<any> | any>();

  useEffect(() => {
    const customTextProps = {
      style: {
        //   fontFamily: Fonts.Regular,
      },
    };
    setCustomText(customTextProps);

    if (!Platform.isTesting) {
      //   initFCM();
    }

    getApolloClient()
      .then(setClient)
      .catch(e => console.log(e));

    dayjs.locale('ko');
    const event = DeviceEventEmitter.addListener(UPDATE_TOKEN, () => {
      getApolloClient(true)
        .then(setClient)
        .catch(e => console.log(e));
    });
    return () => {
      event.remove();
    };
  }, []);

  if (!client) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ApplicationNavigator />
        <Toast config={toastConfig} />
      </ApolloProvider>
    </Provider>
  );
};

export default App;

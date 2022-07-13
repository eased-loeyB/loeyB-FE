import React, {useState, useEffect} from 'react';
// @ts-ignore
import {DeviceEventEmitter, LogBox, Platform, View} from 'react-native';

import {ApolloClient, ApolloLink} from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks';
import apolloLogger from 'apollo-link-logger';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import 'react-native-gesture-handler';
import {setCustomText} from 'react-native-global-props';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import {getApolloClient} from './apollo/client';
//import {Fonts} from './assets';
import './translations';
import BackgroundCommon from './components/BackgroundCommon';
import {ApplicationNavigator} from './navigation';
import store from './store';
import {create} from './utils/design';
import {UPDATE_TOKEN} from './utils/Events';
import {toastConfig} from './utils/ToastService';

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
    return (
      <BackgroundCommon>
        <View />
      </BackgroundCommon>
    );
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

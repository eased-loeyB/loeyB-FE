import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/routers';
import {navigation} from '../utils/navigation';
import _ from 'lodash';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function goBackToScreen(name: string) {
  try {
    const routes = navigationRef.current?.getState().routes;
    if ((routes ?? []).length > 0) {
      // @ts-ignore
      const indexScreenWillBack = _.findIndex(
        // @ts-ignore
        routes[0]!.state.routes,
        item => item.name === name,
      );

      if (indexScreenWillBack > 0) {
        // @ts-ignore
        const lengthInCurrentStack = routes[0]!.state.routes.length;
        const stepNumber =
          (lengthInCurrentStack ?? indexScreenWillBack) -
          indexScreenWillBack -
          1;
        navigation().dispatch(StackActions.pop(stepNumber));
      }
    }
  } catch (e) {
    console.log(`Can not back to ${name}`);
    goBack();
  }
}

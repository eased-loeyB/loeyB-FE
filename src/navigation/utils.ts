import {StackActions, TabActions} from '@react-navigation/routers';
import {findIndex} from 'lodash';

import {navigationRef} from './Application';

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
      const indexScreenWillBack = findIndex(
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
        navigationRef.current?.dispatch(StackActions.pop(stepNumber));
      }
    }
  } catch (e) {
    console.log(`Can not back to ${name}`);
    goBack();
  }
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function jumpToTab(tabName: string, params?: any) {
  const jumpToAction = TabActions.jumpTo(tabName, params);

  return navigationRef.current?.dispatch(jumpToAction);
}

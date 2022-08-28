import {StackActions} from '@react-navigation/routers';
import {findIndex} from 'lodash';

import {navigationRef} from './Application';

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

import {navigationRef} from '../navigation/Root';
import {StackActions} from '@react-navigation/routers';
import {TabActions} from '@react-navigation/native';

export const navigation = () => navigationRef.current!;

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.push(screenName, params));
  };

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const goBack = () => navigation().goBack();

export const popToTop = () => navigation().dispatch(StackActions.popToTop());

export const jumpToTab = (tabName: string, params?: any) => {
  const jumpToAction = TabActions.jumpTo(tabName, params);

  return navigation().dispatch(jumpToAction);
};

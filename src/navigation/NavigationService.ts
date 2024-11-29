import * as React from 'react';

import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef: React.RefObject<NavigationContainerRef> =
  React.createRef();

export class NavigationService {
  static navigate(name: string, params?: object) {
    navigationRef.current?.navigate(name, params);
  }

  static replace(name: string, params?: object) {
    navigationRef.current?.reset(name, params);
  }

  static goBack() {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current?.goBack();
    }
  }
}

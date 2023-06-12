import {ImageRequireSource} from 'react-native/types';

export type ToastType = {
  position?: 'top' | 'bottom';
  offset?: number;
  visibilityTime?: number;
  successIcon?: ImageRequireSource;
  errorIcon?: ImageRequireSource;
  infoIcon?: ImageRequireSource;
  defaultIcon?: ImageRequireSource;
  successColor?: string;
  errorColor?: string;
  infoColor?: string;
  defaultColor?: string;
};

export type ShowToastType = 'success' | 'error' | 'info' | 'default';

export type ToastProps = {
  key: number;
  message: string;
  type: ShowToastType;
  offSet: number;
  iconPath?: ImageRequireSource;
};

export type AnimatedToastProps = {
  index: number;
  cbOnDisplayed: (a: number) => void;
  toast: ToastProps;
  cbOnLayout: (a: number) => void;
  colorNIcon: {color: string; icon: ImageRequireSource};
  position: 'top' | 'bottom';
  visibilityTime: number;
};

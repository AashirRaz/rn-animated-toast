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
  isAnimated?: boolean;
};

export type ShowToastType = 'success' | 'error' | 'info' | 'default';

export type ToastConfig = {
  [key in ShowToastType]: {color: string; icon?: ImageRequireSource};
};

export type ToastProps = {
  key: number;
  message: string;
  type: ShowToastType;
  iconPath?: ImageRequireSource;
};

export type GeneralToastProps = {
  cbOnDisplayed: (i: ToastProps) => void;
  toast: ToastProps;
  colorNIcon: {color: string; icon?: ImageRequireSource};
  position: 'top' | 'bottom';
  visibilityTime: number;
};

import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Colors} from '../themes/Colors';
import {
  ImageRequireSource,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from 'react-native';
import {Icons} from '../assets/icons';
import {TOAST_COLORS} from '../themes/Colors';
import {ShowToastType, ToastConfig, ToastProps, ToastType} from './type';
import AnimatedToast from '../components/AnimatedToast';
import SimpleToast from '../components/SimpleToast';

const ref = React.createRef() as any;
let tempToasts = [] as ToastProps[];

export const showToast = (
  message: string,
  type: ShowToastType = 'default',
  iconPath?: ImageRequireSource,
  isStacked = false,
) => {
  if (
    !isStacked &&
    tempToasts.find((toast: ToastProps) => toast.message == message)
  )
    return;

  const toast = {
    key: Math.random() * Date.now(),
    message,
    type,
    iconPath,
  };

  tempToasts.push(toast);
  ref.current?.((toasts: ToastProps[]) => [...toasts, toast]);
};

const Toast = ({
  position = 'top',
  offset = 30,
  visibilityTime = 5000,
  successIcon = Icons.ToastCheck,
  errorIcon = Icons.ToastError,
  infoIcon = Icons.ToastInfo,
  defaultIcon,
  successColor = TOAST_COLORS.success,
  errorColor = TOAST_COLORS.error,
  infoColor = TOAST_COLORS.info,
  defaultColor = Colors.DARK_2,
  isAnimated = false,
}: ToastType) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const ToastConfig: ToastConfig = {
    success: {color: successColor, icon: successIcon},
    error: {color: errorColor, icon: errorIcon},
    info: {color: infoColor, icon: infoIcon},
    default: {color: defaultColor, icon: defaultIcon},
  };

  useEffect(() => {
    if (
      Platform.OS == 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useLayoutEffect(() => {
    ref.current = setToasts;

    return () => {
      ref.current = null;
      setToasts([]);
      tempToasts = [];
    };
  }, []);

  const pop = (toast: ToastProps) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    tempToasts = tempToasts.filter(item => item.key != toast?.key);
    setToasts(prev => prev.filter(item => item.key != toast?.key));
  };

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 999,
        [position]: offset + position == 'bottom' ? 20 : 0,
        width: '100%',
      }}>
      {toasts.map(item =>
        isAnimated ? (
          <AnimatedToast
            key={item?.key}
            cbOnDisplayed={pop}
            toast={item}
            colorNIcon={ToastConfig[item?.type]}
            position={position}
            visibilityTime={visibilityTime}
          />
        ) : (
          <SimpleToast
            key={item?.key}
            cbOnDisplayed={pop}
            toast={item}
            colorNIcon={ToastConfig[item?.type]}
            position={position}
            visibilityTime={visibilityTime}
          />
        ),
      )}
    </View>
  );
};

export default Toast;

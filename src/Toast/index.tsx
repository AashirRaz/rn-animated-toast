import React, {useEffect, useState} from 'react';

import {Colors} from '@Theme/Colors';
import {ImageRequireSource} from 'react-native';
import {Icons} from '../assets/icons';
import {TOAST_COLORS} from '../themes/Colors';
import AnimatedToast from './AnimatedToast';
import {ShowToastType, ToastProps, ToastType} from './type';

let toasts: ToastProps[] = [];
const ref = React.createRef<Function>();
const offSets = React.createRef<number[]>();

export const showToast = (
  message: string,
  type: ShowToastType = 'default',
  iconPath?: ImageRequireSource,
) => {
  const key = Date.now();
  const offSet = offSets.current?.reduce((off, acc) => off + acc + 10);

  toasts.push({
    key,
    message,
    type,
    offSet,
    iconPath,
  });
  ref.current?.([...toasts, {key, message, type, offSet, iconPath}]);
};

const Toast = ({
  position = 'top',
  offset = 50,
  visibilityTime = 4000,
  successIcon = Icons.ToastCheck,
  errorIcon = Icons.ToastError,
  infoIcon = Icons.ToastInfo,
  defaultIcon,
  successColor = TOAST_COLORS.success,
  errorColor = TOAST_COLORS.error,
  infoColor = TOAST_COLORS.info,
  defaultColor = Colors.DARK_2,
}: ToastType) => {
  const [tost, setTost] = useState(toasts);

  const ToastConfig = {
    success: {color: successColor, icon: successIcon},
    error: {color: errorColor, icon: errorIcon},
    info: {color: infoColor, icon: infoIcon},
    default: {color: defaultColor, icon: defaultIcon},
  };

  ref.current = setTost;

  useEffect(() => {
    offSets.current = [offset];
  }, []);

  // remove toast from array
  const pop = (index: number) => {
    // if toast is the last one, clear the array
    index == toasts.length - 1 &&
      ((toasts = []), setTost([]), (offSets.current = [offset]));
  };

  const cbOnLayout = (offset: number) => {
    offSets.current?.push(offset);
  };

  return (
    <>
      {toasts.map((item, index) => (
        <AnimatedToast
          key={item?.key}
          index={index}
          cbOnDisplayed={pop}
          toast={item}
          cbOnLayout={cbOnLayout}
          colorNIcon={ToastConfig[item?.type]}
          position={position}
          visibilityTime={visibilityTime}
        />
      ))}
    </>
  );
};

export default Toast;

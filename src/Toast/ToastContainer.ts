import React from "react";
import {Animated, ImageSourcePropType} from "react-native";
import {Colors, TOAST_COLORS} from "../themes/Colors";
import {Icons} from "../assets/icons";

let toastRef = React.createRef();
let toastPropsRef = React.createRef();

type ShowToastType = "success" | "error" | "info" | "default";

export const showToast = (
  message: string,
  type: ShowToastType = "default",
  iconPath?: ImageSourcePropType
) => {
  toastPropsRef.current = {
    message,
    type,
    iconPath,
  };

  toastRef?.current && toastRef?.current(true);
};

export const hideToast = () => {
  toastRef?.current && toastRef?.current(false);
};

export const ToastConfig = {
  success: {color: TOAST_COLORS.success, icon: Icons.ToastCheck},
  error: {color: TOAST_COLORS.error, icon: Icons.ToastError},
  info: {color: TOAST_COLORS.info, icon: Icons.ToastInfo},
  default: {color: Colors.DARK_2, icon: null},
};

export default function useToast(
  position: string,
  offset: number,
  visibilityTime: number
) {
  const [visible, setVisiblity] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const posAnim = React.useRef(new Animated.Value(-80)).current;

  React.useLayoutEffect(() => {
    toastRef.current = setVisiblity;
  }, []);

  React.useEffect(() => {
    const animateToValue = visible
      ? position == "bottom"
        ? -offset
        : offset
      : position == "bottom"
      ? 80
      : -80;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(posAnim, {
        toValue: animateToValue,
        useNativeDriver: true,
      }),
    ]).start();

    const a = setTimeout(() => {
      hideToast();
    }, visibilityTime);

    return () => {
      clearTimeout(a);
    };
  }, [visible]);

  const Icon =
    toastPropsRef?.current?.iconPath ??
    ToastConfig[toastPropsRef?.current?.type || "default"].icon;

  return {
    visible,
    fadeAnim,
    posAnim,
    Icon,
    toast: {
      message: toastPropsRef?.current?.message,
      type: toastPropsRef?.current?.type,
    },
  };
}

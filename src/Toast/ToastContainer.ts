import React from "react";
import {Animated, ImageRequireSource} from "react-native";
import {Colors, TOAST_COLORS} from "../themes/Colors";
import {Icons} from "../assets/icons";

let toastRef = React.createRef();
let toastPropsRef = React.createRef<{
  message: string;
  type: ShowToastType;
  showDefaultIcon: boolean;
  iconPath?: ImageRequireSource;
}>();

type ShowToastType = "success" | "error" | "info" | "default";
type ToastConfigType = {
  success: {color: string; icon: ImageRequireSource};
  error: {color: string; icon: ImageRequireSource};
  info: {color: string; icon: ImageRequireSource};
  default: {color: string; icon: ImageRequireSource | undefined};
};

export const showToast = (
  message: string,
  type: ShowToastType = "default",
  showDefaultIcon: boolean,
  iconPath?: ImageRequireSource
) => {
  toastPropsRef.current = {
    message,
    type,
    showDefaultIcon,
    iconPath,
  };

  toastRef?.current && toastRef?.current(true);
};

export const hideToast = () => {
  toastRef?.current && toastRef?.current(false);
};

export default function useToast(
  position: string,
  offset: number,
  visibilityTime: number,
  ToastConfig: ToastConfigType
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

  const Icon = toastPropsRef?.current?.showDefaultIcon
    ? ToastConfig[toastPropsRef?.current?.type].icon ?? null
    : toastPropsRef?.current?.iconPath ??
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

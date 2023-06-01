import React from "react";
import {
  Animated,
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {Colors, TOAST_COLORS} from "../themes/Colors";
import useToast, {ToastConfig, hideToast} from "./ToastContainer";
import {Icons} from "../assets/icons";

type ToastType = {
  position?: "top" | "bottom";
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

const Toast = ({
  position = "bottom",
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
  const ToastConfig = {
    success: {color: successColor, icon: successIcon},
    error: {color: errorColor, icon: errorIcon},
    info: {color: infoColor, icon: infoIcon},
    default: {color: defaultColor, icon: defaultIcon},
  };

  const {fadeAnim, posAnim, visible, Icon, toast} = useToast(
    position,
    offset,
    visibilityTime,
    ToastConfig
  );

  return (
    <Animated.View
      onTouchMove={({nativeEvent}) =>
        nativeEvent.locationY > 100 && hideToast()
      }
      style={styles.mainContainer(
        visible,
        fadeAnim,
        posAnim,
        ToastConfig[toast.type]?.color,
        position
      )}
    >
      {Icon && (
        <Image
          source={Icon}
          style={styles.iconStyle(ToastConfig[toast.type]?.color)}
        />
      )}
      <View style={toast.message?.length > 36 && {flex: 1}}>
        <Text
          style={{
            fontSize: 13,
            color: Colors.DARK_2,
            fontWeight: "bold",
          }}
          numberOfLines={2}
        >
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  iconStyle: (color: string): any => ({
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
    tintColor: color,
  }),
  mainContainer: (
    visible: boolean,
    fadeAnim: any,
    posAnim: any,
    color: string,
    position: string
  ) => ({
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    ...(position == "bottom" && {bottom: 0}),
    zIndex: visible ? 9999 : undefined,
    opacity: fadeAnim,
    transform: [
      {
        translateY: posAnim,
      },
    ],
    borderColor: color,
    borderWidth: 2,
    backgroundColor: Colors.WHITE,
    borderRadius: 40,
    paddingVertical: 15,
    shadowColor: Colors.DARK_2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    marginHorizontal: 30,
    paddingRight: 20,
    paddingLeft: 10,
  }),
});

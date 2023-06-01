import React from "react";
import {Animated, Image, StyleSheet, Text, View} from "react-native";
import {Colors} from "../themes/Colors";
import useToast, {ToastConfig, hideToast} from "./ToastContainer";

type ToastType = {
  position?: "top" | "bottom";
  offset?: number;
  visibilityTime?: number;
};

const Toast = ({
  position = "bottom",
  offset = 50,
  visibilityTime = 4000,
}: ToastType) => {
  const {fadeAnim, posAnim, visible, Icon, toast} = useToast(
    position,
    offset,
    visibilityTime
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
        toast.type,
        position
      )}
    >
      {Icon && <Image source={Icon} style={styles.iconStyle(toast.type)} />}
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
  iconStyle: (type: string): any => ({
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
    tintColor: ToastConfig[type]?.color,
  }),
  mainContainer: (
    visible: boolean,
    fadeAnim: any,
    posAnim: any,
    type: string,
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
    borderColor: ToastConfig[type]?.color,
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

import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ImageRequireSource,
  PanResponder,
} from 'react-native';
import {ToastProps} from '../../Toast/type';
import {Colors} from '../../themes/Colors';

export default function useAnimatedToast(
  cbOnDisplayed: (i: ToastProps) => void,
  toast: ToastProps,
  colorNIcon: {color: string; icon?: ImageRequireSource},
  position: 'top' | 'bottom',
  visibilityTime: number,
) {
  const icon = toast?.iconPath ?? colorNIcon?.icon;

  const animInstance = React.useRef(new Animated.Value(0)).current;
  const animatedWidth = React.useRef(new Animated.Value(0)).current;
  const animatedHeight = React.useRef(new Animated.Value(0)).current;
  const animatedPadding = React.useRef(new Animated.Value(0)).current;
  const animatedBgColor = React.useRef(new Animated.Value(0)).current;
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (a, g) => {
        pan.setValue({x: g.dx, y: 0});
      },
      onPanResponderRelease: (a, g) => {
        if (a.nativeEvent.pageX > Dimensions.get('window').width - 50) {
          Animated.timing(pan, {
            toValue: {x: Dimensions.get('window').width, y: 0},
            useNativeDriver: false,
          }).start(() => cbOnDisplayed(toast));
        } else if (a.nativeEvent.pageX < 50) {
          Animated.timing(pan, {
            toValue: {x: -Dimensions.get('window').width, y: 0},
            useNativeDriver: false,
          }).start(() => cbOnDisplayed(toast));
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    let timer: any;
    animate(1);
    timer = setTimeout(() => widthAnimate(0), visibilityTime);
    return () => clearTimeout(timer);
  }, []);

  const animate = (val: any) => {
    Animated.spring(animInstance, {
      toValue: val,
      useNativeDriver: false,
      delay: !val ? 300 : 0,
    }).start(() => (!val ? cbOnDisplayed(toast) : widthAnimate(1)));
  };

  const widthAnimate = (val: any) => {
    Animated.timing(animatedPadding, {
      toValue: val,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedWidth, {
      toValue: val,
      useNativeDriver: false,
    }).start(() => !val && animate(0));
    Animated.timing(animatedHeight, {
      toValue: val,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedBgColor, {
      toValue: val,
      useNativeDriver: false,
    }).start();
  };

  const opacity = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [position == 'bottom' ? 200 : -200, 30],
  });

  const width = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 335],
  });

  const height = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 58],
  });

  const padding = animatedPadding.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 10],
  });

  const bgColor = animatedBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colorNIcon.color, Colors.WHITE],
  });

  const reverseBg = animatedBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.WHITE, colorNIcon.color],
  });

  const animatedStyles = {
    maxWidth: width,
    maxHeight: height,
    paddingLeft: padding,
    backgroundColor: bgColor,
    transform: [{translateX: pan.x}, {translateY}],
    opacity,
    borderColor: colorNIcon.color,
  };

  return {
    icon,
    panResponder,
    animatedStyles,
    reverseBg,
  };
}

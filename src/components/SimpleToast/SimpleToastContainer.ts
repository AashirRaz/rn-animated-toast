import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ImageRequireSource,
  PanResponder,
} from 'react-native';
import {ToastProps} from '../../Toast/type';
import {Colors} from '../../themes/Colors';

export default function useSimpleToast(
  cbOnDisplayed: (i: ToastProps) => void,
  toast: ToastProps,
  colorNIcon: {color: string; icon?: ImageRequireSource},
  position: 'top' | 'bottom',
  visibilityTime: number,
) {
  const icon = toast?.iconPath ?? colorNIcon?.icon;

  const animInstance = React.useRef(new Animated.Value(0)).current;
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
            useNativeDriver: true,
          }).start(() => cbOnDisplayed(toast));
        } else if (a.nativeEvent.pageX < 50) {
          Animated.timing(pan, {
            toValue: {x: -Dimensions.get('window').width, y: 0},
            useNativeDriver: true,
          }).start(() => cbOnDisplayed(toast));
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    let timer: any;
    animate(1);
    timer = setTimeout(() => animate(0), visibilityTime);
    return () => clearTimeout(timer);
  }, []);

  const animate = (val: any) => {
    Animated.spring(animInstance, {
      toValue: val,
      useNativeDriver: true,
    }).start(() => !val && cbOnDisplayed(toast));
  };

  const opacity = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [position == 'bottom' ? 200 : -200, 30],
  });

  const animatedStyles = {
    opacity,
    transform: [{translateX: pan.x}, {translateY}],
    borderColor: colorNIcon.color,
  };

  return {
    icon,
    animatedStyles,
    panResponder,
  };
}

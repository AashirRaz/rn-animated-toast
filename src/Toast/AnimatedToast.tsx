import React, {useEffect} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../themes/Colors';
import {once} from '../reuseableFunction';
import {AnimatedToastProps} from './type';

const AnimatedToast = ({
  index,
  cbOnDisplayed,
  toast,
  cbOnLayout,
  colorNIcon,
  position,
  visibilityTime,
}: AnimatedToastProps) => {
  const animInstance = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate(1);
    setTimeout(() => animate(0), visibilityTime);
  }, []);

  const animate = (val: any) => {
    Animated.spring(animInstance, {
      toValue: val,
      delay: 100 * index,
      useNativeDriver: true,
    }).start(() => !val && cbOnDisplayed(index));
  };

  const opacity = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animInstance.interpolate({
    inputRange: [0, 1],
    outputRange: [
      position == 'bottom' ? 200 : -200,
      position == 'bottom' ? -toast.offSet : toast.offSet,
    ],
  });

  const hide = once(animate);

  const icon = toast?.iconPath ?? colorNIcon?.icon;

  return (
    <Animated.View
      onTouchMove={({nativeEvent}) => {
        nativeEvent.locationY < 10 && hide(0);
      }}
      onLayout={e => cbOnLayout(e.nativeEvent.layout.height)}
      style={styles.toast(
        position == 'bottom',
        opacity,
        translateY,
        colorNIcon.color,
      )}>
      <Image
        source={icon}
        style={styles.iconStyle(!!toast?.iconPath, colorNIcon?.color)}
      />

      <View style={toast.message?.length > 36 && {flex: 1}}>
        <Text style={styles.toastMessage}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
};

export default AnimatedToast;

const styles = StyleSheet.create({
  toast: (
    isBottomPos: boolean,
    opacity: any,
    translateY: any,
    color: string,
  ): any => ({
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...(isBottomPos && {bottom: 0}),
    opacity,
    transform: [{translateY}],
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
  iconStyle: (isIconPath: boolean, color: string): any => ({
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
    ...(!isIconPath && {tintColor: color}),
  }),
  toastMessage: {
    fontSize: 13,
    color: Colors.DARK_2,
    fontWeight: 'bold',
  },
});

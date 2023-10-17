import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../themes/Colors';
import {GeneralToastProps} from '../../Toast/type';
import useSimpleToast from './SimpleToastContainer';

const SimpleToast = ({
  cbOnDisplayed,
  toast,
  colorNIcon,
  position,
  visibilityTime,
}: GeneralToastProps) => {
  const {icon, animatedStyles, panResponder} = useSimpleToast(
    cbOnDisplayed,
    toast,
    colorNIcon,
    position,
    visibilityTime,
  );

  return (
    <Animated.View
      style={[styles.toast, !!icon && styles.iconPadding, animatedStyles]}
      {...panResponder.panHandlers}>
      {icon && (
        <Animated.Image
          source={icon}
          style={[
            styles.iconStyle,
            !!!toast?.iconPath && {tintColor: colorNIcon?.color},
          ]}
        />
      )}
      <View style={toast.message?.length > 36 && styles.flexOne}>
        <Text style={styles.toastMessage}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
};

export default SimpleToast;

const styles = StyleSheet.create({
  flexOne: {flex: 1},
  toast: {
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    backgroundColor: Colors.WHITE,
    borderRadius: 40,
    paddingVertical: 10,
    shadowColor: Colors.DARK_2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    marginHorizontal: 30,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  iconPadding: {
    paddingRight: 20,
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  toastMessage: {
    fontSize: 13,
    color: Colors.DARK_2,
    fontWeight: 'bold',
  },
});

/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, ViewStyle, ActivityIndicator} from 'react-native';
import {Ionicons as Icon, FontAwesome as FAIcon} from '@expo/vector-icons';

// import components
import {ButtonText} from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// import colors
import Colors from '../../theme/colors';

// ContainedButton Config
const BUTTON_BORDER_RADIUS = 4;
const BUTTON_HEIGHT = 48;
const BUTTON_WIDTH = '100%';

const styles = StyleSheet.create({
  container: {
    borderRadius: BUTTON_BORDER_RADIUS,
    backgroundColor: Colors.primaryColor,
    elevation: 2,
    overflow: 'hidden',
  },
  containedButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 64,
    maxWidth: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  rounded: {
    borderRadius: BUTTON_HEIGHT / 2,
  },
  socialIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 52,
  },
  iconContainer: {
    marginLeft: 12,
  },
  title: {
    paddingHorizontal: 16,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
  },
});

// ContainedButton Props
type Props = {
  onPress: () => void,
  activeOpacity: number,
  buttonStyle: ViewStyle,
  height: number,
  borderRadius: number,
  color: string,
  iconColor: string,
  iconName: string,
  socialIconName: string,
  title: string,
  titleColor: string,
  rounded: boolean,
  loading: boolean,
  disabled: boolean,
};

// ContainedButton
const ContainedButton = ({
  onPress,
  activeOpacity = 0.85,
  buttonStyle,
  height,
  borderRadius,
  color,
  iconColor,
  iconName,
  socialIconName,
  title,
  titleColor,
  rounded,
  loading,
  disabled,
}: Props) => (
  <View
    style={[
      styles.container,
      color && {backgroundColor: color},
      borderRadius && {borderRadius},
      rounded && styles.rounded,
      height && rounded && {borderRadius: height / 2},
      buttonStyle,
      disabled ? {opacity: 0.6} : {opacity: 1},
    ]}>
    <TouchableItem
      onPress={!disabled ? onPress : null}
      activeOpacity={activeOpacity}
      // borderless
    >
      <View style={[styles.containedButton, height && {height}]}>
        {socialIconName && (
          <View style={styles.socialIconContainer}>
            <FAIcon name={socialIconName} size={20} color={iconColor} />
          </View>
        )}
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={18} color={iconColor} />
          </View>
        )}

        <ButtonText
          style={[
            styles.title,
            titleColor && {color: titleColor},
            iconName && {paddingLeft: 8},
          ]}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : title !== undefined ? (
            title.toUpperCase()
          ) : (
            'BUTTON'
          )}
        </ButtonText>
      </View>
    </TouchableItem>
  </View>
);

export default ContainedButton;

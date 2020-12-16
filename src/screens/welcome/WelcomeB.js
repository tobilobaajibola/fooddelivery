/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import LinkButton from '../../components/buttons/LinkButton';
import Logo from '../../components/logo/Logo';
import OutlinedButton from '../../components/buttons/OutlinedButton';

// import colors
import Colors from '../../theme/colors';

// WelcomeB Config

// WelcomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsGroup: {
    flex: 3,
    paddingHorizontal: 32,
    width: '100%',
  },
  vspace16: {
    height: 16,
  },
  vspace32: {
    height: 32,
  },
  linkButtonText: {
    color: Colors.white,
    textAlign: 'center',
  },
});

// WelcomeB Screen
export default class WelcomeB extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.logoContainer}>
            <Logo size={112} tintColor={Colors.white} />
          </View>

          <View style={styles.buttonsGroup}>
            <ContainedButton
              onPress={this.props.navigation.navigate('SignUp')}
              color={Colors.white}
              title={'I am new'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />

            <View style={styles.vspace16} />

            <OutlinedButton
              onPress={this.props.navigation.navigate('SignIn')}
              title={'I have been here'.toUpperCase()}
              titleColor={Colors.white}
              rippleColor={'rgba(255, 255, 255, 0.32)'}
            />

            <View style={styles.vspace32} />

            <LinkButton
              title="Skip"
              onPress={this.props.navigation.navigate('HomeNavigator')}
              titleStyle={styles.linkButtonText}
            />
          </View>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}

WelcomeB.propTypes = {
  navigation: PropTypes.object,
};

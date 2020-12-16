import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {checkOnboardStatus} from '../../services/auth-hook';
import Colors from '../../theme/colors';

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`),
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  async hideSplashScreen() {
    await SplashScreen.hideAsync();
  }

  componentDidMount() {
    setTimeout(async () => {
      await checkOnboardStatus(this.hideSplashScreen, this.props.navigation);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Xnatives Foods</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

Splash.propTypes = {
  navigation: PropTypes.object,
};

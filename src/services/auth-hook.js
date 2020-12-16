import AsyncStorage from '@react-native-community/async-storage';

export const checkLoginStatus = async (hideSplashScreen, navigation) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      hideSplashScreen();
      return navigation.navigate('Welcome');
    }
    hideSplashScreen();
    return navigation.navigate('HomeNavigator');
  } catch (e) {
    hideSplashScreen();
    return navigation.navigate('Welcome');
  }
};

export const checkOnboardStatus = async (hideSplashScreen, navigation) => {
  try {
    const onboarded = await AsyncStorage.getItem('Onboarding');
    if (onboarded) {
      checkLoginStatus(hideSplashScreen, navigation);
    } else {
      hideSplashScreen();
      return navigation.navigate('Onboarding');
    }
  } catch (e) {
    hideSplashScreen();
    return navigation.navigate('Onboarding');
  }
};

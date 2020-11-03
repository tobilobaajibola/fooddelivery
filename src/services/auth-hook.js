import AsyncStorage from '@react-native-community/async-storage';

export const checkLoginStatus = async (hideSplashScreen, navigation) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      hideSplashScreen();
      return navigation.navigate('login');
    }
    hideSplashScreen();
    return navigation.navigate('home');
  } catch (e) {
    hideSplashScreen();
    return navigation.navigate('login');
  }
};

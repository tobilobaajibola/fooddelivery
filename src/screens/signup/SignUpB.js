/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// SignUpB Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';

// SignUpB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.white,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

// SignUpB
export default class SignUpB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailFocused: false,
      phone: '',
      phoneFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
    };
  }

  emailChange = text => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      phoneFocused: false,
      passwordFocused: false,
    });
  };

  phoneChange = text => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      phoneFocused: true,
      emailFocused: false,
      passwordFocused: false,
    });
  };

  passwordChange = text => {
    this.setState({
      password: text,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };

  onTogglePress = () => {
    const {secureTextEntry} = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  createAccount = () => {
    const { email, phone, password } = this.state;
    //  fetch('http://xnativesfoods.com/api/login/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       mobile_number: phone
    //     }, alert())

       
    //   });
      this.setState(
      {
        emailFocused: false,
        phoneFocused: false,
        passwordFocused: false,
      },
     
      // this.navigateTo('Verification'),
    );
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      emailFocused,
      phoneFocused,
      password,
      passwordFocused,
      secureTextEntry,
    } = this.state;

    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.content}>
              <View />

              <View style={styles.form}>
                <UnderlineTextInput
                  onRef={r => {
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder="E-mail"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlineTextInput
                  onRef={r => {
                    this.phone = r;
                  }}
                  onChangeText={this.phoneChange}
                  onFocus={this.phoneFocus}
                  inputFocused={phoneFocused}
                  onSubmitEditing={this.focusOn(this.password)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlinePasswordInput
                  onRef={r => {
                    this.password = r;
                  }}
                  onChangeText={this.passwordChange}
                  onFocus={this.passwordFocus}
                  inputFocused={passwordFocused}
                  onSubmitEditing={this.createAccount}
                  returnKeyType="done"
                  placeholder="Password"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? 'Show' : 'Hide'}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.createAccount}
                    color={Colors.accentColor}
                    title={'Create Account'.toUpperCase()}
                  />
                </View>

                <View style={styles.separator}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.buttonsGroup}>
                  <ContainedButton
                    onPress={this.createAccount}
                    color={Colors.surface}
                    socialIconName="facebook-square"
                    iconColor="#3b5998"
                    title={'Sign up with Facebook'.toUpperCase()}
                    titleColor="#3b5998"
                  />
                  <View style={styles.vSpacer} />
                  <ContainedButton
                    onPress={this.createAccount}
                    color={Colors.surface}
                    socialIconName="google"
                    iconColor="#db4437"
                    title={'Sign up with Google'.toUpperCase()}
                    titleColor="#db4437"
                  />
                </View>
              </View>

              <TouchableWithoutFeedback
                onPress={this.navigateTo('TermsConditions')}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    By registering, you accepts our
                  </Text>
                  <View style={styles.termsContainer}>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Terms & Conditions
                    </Text>
                    <Text style={styles.footerText}> and </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Privacy Policy
                    </Text>
                    <Text style={styles.footerText}>.</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}

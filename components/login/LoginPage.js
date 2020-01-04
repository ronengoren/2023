import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  AsyncStorage,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  findNodeHandle,
  Platform,
  ImageBackground,
  SafeAreaView
} from "react-native";
import RectButton from "../global/RectButton";

import AuthStyle from "./AuthStylesheet";
import Fire from "../../Fire";
import firebase from "firebase";
// import auth from "@react-native-firebase/auth";

const IS_ANDROID = Platform.OS === "android";

class LoginPage extends Component {
  state = {
    isLoading: false,
    email: "",
    password: ""
  };
  constructor(props) {
    super(props);
    // this.studentProfile = null;
  }
  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("CreateProfilePage"))
      .catch(error => console.log(error));
  };
  _signup = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("CreateProfilePage"))
      .catch(error => console.log(error));
  };

  _forgotPassword() {
    this.props.setEmailInput(this.state.emailInput);
    this._goToForgotPassword();
  }
  _inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        150, //additionalOffset
        true
      );
    }, 70);
  }
  _dismissFocus(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo();
    }, 0);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ImageBackground
          source={require("./img/loginBg.png")}
          style={AuthStyle.container}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator animating={true} color="black" />
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={require("./img/loginBg.png")}
          style={AuthStyle.container}
        >
          <SafeAreaView style={AuthStyle.container}>
            <ScrollView
              ref="scrollView"
              style={AuthStyle.container}
              contentContainerStyle={AuthStyle.centerAlign}
            >
              <View style={AuthStyle.logoContainer}>
                <Image
                  source={require("./img/logo.png")}
                  style={AuthStyle.logo}
                />
              </View>
              <View style={AuthStyle.body}>
                <Text style={AuthStyle.textTitles}> Tufts Email: </Text>
                <View style={AuthStyle.emailInputBorder}>
                  <TextInput
                    ref="emailInput"
                    style={AuthStyle.emailInput}
                    onChangeText={email => this.setState({ email })}
                    underlineColorAndroid="white"
                    keyboardType="email-address"
                    value={this.state.email}
                    returnKeyType={"next"}
                    onFocus={this._inputFocused.bind(this, "emailInput")}
                    onBlur={this._dismissFocus.bind(this, "emailInput")}
                    onSubmitEditing={event => {
                      this.refs.passwordInput.focus();
                    }}
                  />
                  <Text style={AuthStyle.emailExt}>{this.props.email_ext}</Text>
                </View>
                <Text style={AuthStyle.textTitles}> Password: </Text>
                <View style={AuthStyle.passwordInputBorder}>
                  <TextInput
                    ref="passwordInput"
                    style={AuthStyle.passwordInput}
                    underlineColorAndroid="white"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                    returnKeyType={"done"}
                    onFocus={this._inputFocused.bind(this, "passwordInput")}
                    onBlur={this._dismissFocus.bind(this, "passwordInput")}
                  />
                </View>
                <RectButton
                  style={[AuthStyle.forgotPasswordButton]}
                  textStyle={AuthStyle.forgotPasswordButtonText}
                  onPress={this._forgotPassword.bind(this)}
                  text="Forgot Password?"
                />
                <View style={styles.buttonContainer}>
                  <RectButton
                    style={[AuthStyle.solidButton, AuthStyle.buttonBlue]}
                    textStyle={[AuthStyle.solidButtonText, AuthStyle.bold]}
                    onPress={this.handleLogin.bind(this)}
                    text="LOGIN"
                  />

                  <RectButton
                    style={[AuthStyle.solidButton, AuthStyle.buttonPink]}
                    textStyle={AuthStyle.solidButtonText}
                    onPress={this._signup.bind(this)}
                    text="SIGNUP!"
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30
  }
});

export default LoginPage;

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
  SafeAreaView,
  Dimensions,
  Animated
} from "react-native";
import RectButton from "../global/RectButton";

import AuthStyle from "./AuthStylesheet";
import Firebase from "../../Fire";
// import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser
} from "../../store/actions/user";
// import auth from "@react-native-firebase/auth";

const IS_ANDROID = Platform.OS === "android";

class LoginPage extends React.Component {
  state = {
    isLoading: false,

    userData: {}
  };
  // componentDidMount = () => {
  //   Firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.props.getUser(user.uid);
  //       if (this.props.user != null) {
  //         this.props.navigation.navigate("ProfileCardView");
  //       }
  //     }
  //   });
  // };
  // componentDidMount = () => {
  //   Firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.props.getUser(user.uid);
  //       if (this.props.user != null) {
  //         this.props.navigation.navigate("ProfileCardView");
  //       }
  //     }
  //   });
  // };

  //   handleLogin = () => {
  //     this.props.login();
  //     // this.props.navigation.navigate("ProfileCardView");
  //     // const { email, password } = this.state;

  //     // firebase
  //     //   .auth()
  //     //   .signInWithEmailAndPassword(email, password)
  //     //   .then(res => {
  //     //     this.storeToken(JSON.stringify(res.user));
  //     //   })
  //     //   .then(() => this.props.navigation.navigate("ProfileCardView"))

  //     //   .catch(error => console.log(error));
  //   };
  _signup = () => {
    this.props.signup();
    // const { email, password } = this.state;
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => this.props.navigation.navigate("CreateProfilePage"))
    //   .catch(error => console.log(error));
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
                    onChangeText={email => this.props.updateEmail(email)}
                    underlineColorAndroid="white"
                    keyboardType="email-address"
                    value={this.props.user.email}
                    returnKeyType={"next"}
                  />
                  <Text style={AuthStyle.emailExt}>{this.props.email_ext}</Text>
                </View>
                <Text style={AuthStyle.textTitles}> Password: </Text>
                <View style={AuthStyle.passwordInputBorder}>
                  <TextInput
                    ref="passwordInput"
                    style={AuthStyle.passwordInput}
                    underlineColorAndroid="white"
                    onChangeText={password =>
                      this.props.updatePassword(password)
                    }
                    value={this.props.user.password}
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
                    onPress={() => this.props.login()}
                    text="LOGIN"
                  />

                  <RectButton
                    style={[AuthStyle.solidButton, AuthStyle.buttonPink]}
                    textStyle={AuthStyle.solidButtonText}
                    onPress={() => this.props.navigation.navigate("Signup")}
                    text="Don't have an account yet? Sign up"
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

// export default LoginPage;
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

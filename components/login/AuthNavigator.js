import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Button,
  Navigator
} from "react-native";
import LoginPage from "./LoginPage";

class AuthNavigator extends Component {
  render() {
    return (
      <View>
        <LoginPage />
      </View>
    );
  }
}

export default AuthNavigator;

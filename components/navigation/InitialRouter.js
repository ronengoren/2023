import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Navigator,
  AsyncStorage,
  NetInfo,
  Alert,
  Text,
  TouchableHighlight,
  Platform,
  Dimensions
} from "react-native";
import LoadingPage from "../misc/LoadingPage";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthNavigator from "../login/AuthNavigator";
import CreateProfilePage from "../login/CreateProfilePage";
import LoginPage from "../login/LoginPage";
import ProfileCardView from "../cards/ProfileCardView";
import GlobalStyles from "../global/GlobalStyles";
import Signup from "../login/Signup";

import { Scene, Router } from "react-native-router-flux";

const global = require("../global/GlobalFunctions");

const IS_ANDROID = Platform.OS === "android";
const NAVBAR_HEIGHT = IS_ANDROID ? 54 : 64; // TODO: check the android tabbar height
const PAGE_HEIGHT = Dimensions.get("window").height - NAVBAR_HEIGHT;
const PAGE_WIDTH = Dimensions.get("window").width;
const NAVBAR_SELECTOR_WIDTH = PAGE_WIDTH * 0.2;
const NAVBAR_SELECTOR_HEIGHT = 2;
const HEADER_TITLE_LEFT_MARGIN = Platform.OS === "ios" ? 0 : 0 || 0;
const SAVE_BUTTON_STATE = global.saveButtonStates();
const NAVIGATOR_BACKHANDLER = "NAVIGATOR_BACKHANDLER";

const AppStack = createStackNavigator({ App: ProfileCardView });
const AuthStack = createStackNavigator({
  Auth: LoginPage,
  Signup: Signup,
  ProfileCardView: ProfileCardView,
  CreateProfilePage: CreateProfilePage
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingPage,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
class InitialRouter extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  //   _renderNavigatorScene(route, navigator) {
  //     <LoadingPage />;
  //   }
  render() {
    //     let initialRouteName = "LoadingPage";
    return <AppContainer />;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
export default InitialRouter;

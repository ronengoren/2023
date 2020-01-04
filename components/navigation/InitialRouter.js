import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Navigator,
  AsyncStorage,
  NetInfo,
  Alert,
  Text,
  TouchableHighlight
} from "react-native";
import LoadingPage from "../misc/LoadingPage";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthNavigator from "../login/AuthNavigator";
import CreateProfilePage from "../login/CreateProfilePage";
import LoginPage from "../login/LoginPage";

const AppStack = createStackNavigator({ App: LoadingPage });
const AuthStack = createStackNavigator({
  Auth: LoginPage,
  CreateProfilePage: CreateProfilePage
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingPage,
      //   App: AppStack,
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

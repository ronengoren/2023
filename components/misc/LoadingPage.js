import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Navigator,
  Platform,
  Dimensions,
  Text,
  StatusBar
} from "react-native";
import GlobalStyles from "../global/GlobalStyles";
import { Icon, ListItem, Snackbar, Toolbar } from "react-native-material-ui";
const NAVBAR_HEIGHT = Platform.OS === "ios" ? 64 : 54; // TODO: check the android tabbar height
const PAGE_HEIGHT = Dimensions.get("window").height - NAVBAR_HEIGHT;
const PAGE_WIDTH = Dimensions.get("window").width;
class LoadingPage extends Component {
  state = {
    loading: false
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // width: PAGE_WIDTH,
    // height: PAGE_HEIGHT + NAVBAR_HEIGHT,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default LoadingPage;

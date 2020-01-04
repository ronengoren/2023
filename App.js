import React, { Component, UseState } from "react";
import {
  ActivityIndicator,
  NativeModules,
  View,
  StyleSheet,
  Text
} from "react-native";
import InitialRouter from "./components/navigation/InitialRouter";

class App extends Component {
  render() {
    return <InitialRouter />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;

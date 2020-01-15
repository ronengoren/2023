import React, { Component, UseState } from "react";
import { StyleSheet } from "react-native";

import reducer from "./store/reducers";
import Routes from "./components/routes";

class App extends Component {
  render() {
    return <Routes />;
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

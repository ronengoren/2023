import React, { Component, UseState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store";

import reducer from "./store/reducers";
import Routes from "./components/routes";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
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

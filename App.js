import React, { Component, UseState } from "react";
import {
  ActivityIndicator,
  NativeModules,
  View,
  StyleSheet,
  Text
} from "react-native";
import InitialRouter from "./components/navigation/InitialRouter";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./store/reducers";
import Routes from "./components/routes";

// const middleware = applyMiddleware(thunkMiddleware);
// const store = createStore(reducer, middleware);

class App extends Component {
  render() {
    return (
      <Routes />
      // <Provider store={store}>
      //   <InitialRouter />
      // </Provider>
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

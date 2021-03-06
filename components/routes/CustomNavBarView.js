import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ViewPropTypes, Button } from "react-native";
// import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "red"
  }
});

class TabView extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Button title="" onPress={Actions.pop}>
          Back
        </Button>
        <Button title="" onPress={() => Actions.replace("launch")}>
          Welcome Page
        </Button>
        <Button
          title=""
          onPress={() => {
            Actions.customNavBar1();
          }}
        >
          Switch to Scene with CustomNavBar #1
        </Button>
        {/* <Button
          onPress={() => {
            Actions.customNavBar2();
          }}>
          Switch to Scene with CustomNavBar #2
        </Button>
        <Button
          onPress={() => {
            Actions.customNavBar3();
          }}>
          Switch to Scene with different CustomNavBar{' '}
        </Button> */}
        <Button
          title=""
          onPress={() => {
            Actions.hiddenNavBar();
          }}
        >
          Switch to Scene with a navBar hidden
        </Button>
      </View>
    );
  }
}
TabView.propTypes = propTypes;

export default TabView;

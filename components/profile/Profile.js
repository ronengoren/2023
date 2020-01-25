import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    show: {
      grid: true,
      full: false,
      pinned: false,
      saved: false
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 12, color: "grey" }}>posts</Text>
      </View>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  picAndInfo: {
    flexDirection: "row",
    margin: 5,
    marginTop: 10,
    marginLeft: 15
  },
  userBioAndStories: {
    flexDirection: "column",
    margin: 10,
    marginTop: 5,
    borderBottomColor: "#dcdde1",
    borderBottomWidth: 1
  },
  typeView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  miniImage: {
    width: 125,
    height: 125,
    margin: 1
  },
  storie: {
    width: 90
  }
});

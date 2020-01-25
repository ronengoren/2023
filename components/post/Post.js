import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  like,
  dislike,
  sendMessage
} from "../../store/actions/posts/PostActions";
import { SimpleLineIcons } from "@expo/vector-icons";
import Input from "../common/Input";

class Post extends Component {
  state = {
    message: "",
    showMessages: false
  };
  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Text style={styles.usernameTop}>{this.props.username}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 300,
    margin: 15,
    marginBottom: 1,
    marginTop: 1
  },
  likes: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 15
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 15,
    marginTop: 1,
    marginRight: 5,
    marginBottom: 1
  },
  text: {
    fontSize: 15,
    margin: 15,
    marginTop: 1,
    marginLeft: 5,
    marginBottom: 1
  },
  seeComments: {
    margin: 15,
    marginTop: 1,
    marginLeft: 15
  },
  textSeeComments: {
    fontSize: 15,
    color: "grey"
  },
  usernameTop: {
    margin: 15,
    marginLeft: 5,
    marginBottom: 2,
    fontWeight: "bold"
  },
  userPic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 15,
    marginLeft: 15,
    marginBottom: 3,
    marginRight: 2
  },
  location: {
    marginLeft: 5,
    marginBottom: 3,
    color: "grey"
  },
  writeComment: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    flex: 0.8
  },
  messages: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 3
  }
});
export default Post;

import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
// import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { logoutUser } from "../../store/actions/session/actions";
import { fetchPosts } from "../../store/actions/posts/PostActions";
import Post from "../post/Post";

class Home extends Component {
  state = {
    posts: []
  };

  // componentWillMount() {
  //   this.props.fetchPosts();
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps) {
  //     this.setState({
  //       posts: nextProps.posts.posts
  //     });
  //   }
  // }
  renderPosts() {
    if (this.state.posts === undefined || this.state.posts.length === 0) {
      return (
        <View>
          <Text>You don't have any post here, may you want to add one?</Text>
        </View>
      );
    } else {
      const arrayPosts = Object.values(this.state.posts);
      const keysPosts = Object.keys(this.state.posts);

      return arrayPosts.map((post, i) => {
        return <Post {...post} key={keysPosts[i]} postKey={keysPosts[i]} />;
      });
    }
  }

  logout = () => {
    this.props.logout();
    setTimeout(() => {
      Actions.reset("login");
    }, 100);
  };
  render() {
    const { container, marginBox, title } = styles;
    const {
      user: { email, uid }
    } = this.props;
    // console.log("this.props");

    // console.log(this.props);
    // console.log("this.props");

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.ScrollContainer}>
          {this.renderPosts()}
          <Button onPress={Actions.profile} title="profile" />
          <Text style={title}>First Name: {uid}</Text>
          <Text style={title}>User: {email}</Text>
          <Button onPress={this.logout} title="Logout" />
        </ScrollView>

        {/* <View style={marginBox}>
          <Button onPress={this.logout} title="Logout" />
        </View>
        <View>
          <Text style={title}>User: {email}</Text>
          <Text style={title}>First Name: {uid}</Text>

          <Button onPress={Actions.createProfile} title="Create Profile" />
          <Button onPress={Actions.todolist} title="Start To-Do List" />
        </View>
        <View style={marginBox}>
          <Icon name="logo-github" size={40} />
          <Text>@skantus</Text>
        </View> */}
      </View>
    );
  }
}
const mapStateToProps = ({ posts, routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user
  // posts: posts
});

const mapDispatchToProps = {
  logout: logoutUser
  // fetchPosts: fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  ScrollContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});

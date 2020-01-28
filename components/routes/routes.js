import React, { Component } from "react";
import { Platform, StyleSheet, Text } from "react-native";

import { styles } from "./styles";
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Modal,
  Drawer,
  Stack,
  Lightbox,
  Tabs
} from "react-native-router-flux";
// import Tabs from "react-native-tabs";

import { createBottomTabNavigator } from "react-navigation-tabs";

import { connect, Provider } from "react-redux";
import configureStore from "../../store";
import SessionContainer from "../../components/auth/LoginForm/loginForm";
import HomeContainer from "../../components/home";
import SignupContainer from "../../components/auth/SignupForm";
import createProfile from "../../components/createProfile";
import TodolistContainer from "../../components/todolist";
import Profile from "../../components/profile/Profile";
import EditProfile from "../../components/profile/EditProfile";
import CreateHighlight from "../../components/highlighteds/CreateHighlight";
import EditHighlight from "../../components/highlighteds/EditHighlight";
import Highlight from "../../components/highlighteds/Highlight";
import Explore from "../../components/explore/Explore";

import AddPost from "../../components/post/AddPost";
import ConfigPost from "../../components/post/ConfigPost";

import CustomTabBar from "./CustomTabBar";
import TabBarIcon from "../../components/tabBar/tabBarIcon";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import { StackViewStyleInterpolator } from "react-navigation-stack";

import { Ionicons, EvilIcons, Icon, FontAwesome } from "@expo/vector-icons";
const HomeIcon = () => <Ionicons name="md-home" size={25} />;
const ExploreIcon = () => <Ionicons name="md-search" size={25} />;
const AddPostIcon = () => <EvilIcons name="plus" size={25} />;
const ProfileIcon = () => <Ionicons name="ios-school" size={25} />;
const stateHandler = (prevState, newState, action) => {
  console.log("onStateChange: ACTION:", action);
};
const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid
});
const mapStateToProps = state => ({
  state: state.nav
});

const ReduxRouter = connect(mapStateToProps)(Router);
const store = configureStore();

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = null;
    this.state = {
      myProfile: null,
      isConnected: null,
      profiles: [],
      noMoreCards: false
    };
  }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Stack key="auth" hideNavBar>
            <Scene
              key="login"
              component={SessionContainer}
              title="Login"
              initial={true}
            />
            <Scene key="signup" component={SignupContainer} title="Signup" />
          </Stack>
          <Stack key="app" hideNavBar panHandlers={null}>
            <Tabs showLabel={false}>
              <Scene
                icon={HomeIcon}
                key="home"
                component={HomeContainer}
                title="Home"
              />
              <Scene
                key="addpost"
                component={AddPost}
                icon={AddPostIcon}
                hideNavBar
                hideTabBar
              />

              {/* <Scene
                icon={AddPostIcon}
                hideNavBar
                hideTabBar
                key="todolist"
                component={TodolistContainer}
                title="To-Do List"
              /> */}
              <Scene key="explore" component={Explore} icon={ExploreIcon} />

              <Scene
                key="profile"
                component={Profile}
                icon={ProfileIcon}
                hideNavBar
              />
            </Tabs>
            <Scene key="configPost" component={ConfigPost} />
            <Scene key="editProfile" component={EditProfile} />
            <Scene key="createHighlight" component={CreateHighlight} />
            <Scene key="editHighlight" component={EditHighlight} />
            <Scene key="highlight" component={Highlight} />

            {/* <Scene
              key="createProfile"
              component={createProfile}
              title="Create Profile"
            /> */}
          </Stack>
        </Stack>
      </Router>
    );
  }
}

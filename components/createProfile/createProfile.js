import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  findNodeHandle,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";
import { connect } from "react-redux";
// import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import GlobalFunctions from "../../components/global/GlobalFunctions";
import RectButton from "../../components/global/RectButton";
import GlobalStyles from "../../components/global/GlobalStyles";
import AuthErrors from "../login/AuthErrors";
import ProfilePhotoPicker from "../settings/ProfilePhotoPicker";
import Firebase, { db } from "../../Fire";

class createProfile extends React.Component {
  constructor(props) {
    super(props);
    this.userProfile = props.userProfile || null;
    // this.stsTokenManager = props.stsTokenManager || null;

    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      description: "",
      major: props.major,
      photos: null
    };
  }
  _updateStates(newProfile) {
    this.setState({
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      description: newProfile.description,
      major: newProfile.major,
      photos: newProfile.photos
    });
  }
  _allPhotosAreNull(photos) {
    for (var i in photos) {
      if (
        photos[i] != null &&
        photos[i].large != null &&
        photos[i].small != null &&
        photos[i].large.length > 0
      ) {
        return false;
      }
    }
    return true;
  }

  _checkPropertiesAreValid() {
    if (this._allPhotosAreNull(this.state.photos)) {
      Alert.alert(
        "Must have at least 1 photo!",
        "Please add at least 1 photo before saving",
        [{ text: "OK", onPress: () => {} }]
      );
    } else if (this.state.firstName.length < 1) {
      Alert.alert("Must include your name!", "", [
        { text: "OK", onPress: () => {} }
      ]);
    } else {
      return true;
    }
    return false;
  }
  _inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        90, //additionalOffset
        true
      );
    }, 50);
  }
  _focusNextField = nextField => {
    this.refs[nextField].focus();
  };
  _updatePhotos(photos) {
    if (photos && photos.length >= 3) {
      this.setState({ photos });
    } else {
      Alert.alert(
        "Photo Error",
        "Something went wrong :( Contact team@jumbosmash.com and let us know that the incorrect number of photos were updated",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }

  _createAccountOnPress() {
    Alert.alert(
      "Terms of Service",
      "Do you agree to our listed Terms of Service? You can access them by tapping the 'Privacy Policy / Terms of Service' button right above the 'Create Account' button.\n\nViolations could lead to account deletion / banning",
      [
        {
          text: "Yes, I agree to the terms",
          onPress: () => {
            this._createAccount();
          }
        },
        { text: "Close", onPress: () => {} }
      ]
    );
  }

  _createAccount(data) {
    if (this._checkPropertiesAreValid()) {
      // console.log("data");

      // console.log(data);
      // console.log("data.data");

      // const {
      //   user: { this.props.user.uid }
      // } = this.props;
      db.collection("users")
        .doc(this.props.user.uid)
        .set({
          uid: this.props.user.uid,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          description: this.state.description,
          major: this.state.major,
          photos: GlobalFunctions.reArrangePhotos(this.state.photos)
        });
    }
  }

  render() {
    const { pop, counter } = Actions;
    const {
      user: { email, uid }
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          { marginTop: this.props.navBarHeight, height: this.props.pageHeight }
        ]}
      >
        <ScrollView ref="scrollView">
          <ProfilePhotoPicker
            photos={this.state.photos}
            updatePhotos={this._updatePhotos.bind(this)}
            firebase={Firebase}
          />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            First Name: {uid}
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            maxLength={80}
            ref="firstName"
            onFocus={this._inputFocused.bind(this, "firstName")}
            onSubmitEditing={() => this._focusNextField("lastName")}
            returnKeyType="next"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Last Name
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            maxLength={80}
            ref="lastName"
            onFocus={this._inputFocused.bind(this, "lastName")}
            onSubmitEditing={() => this._focusNextField("description")}
            returnKeyType="next"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Bio
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[
              GlobalStyles.text,
              styles.textListItem,
              styles.textInput,
              { height: 100, paddingTop: 5, paddingBottom: 5 }
            ]}
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
            multiline={true}
            maxLength={500}
            ref="description"
            onFocus={this._inputFocused.bind(this, "description")}
          />
          <View style={styles.line} />

          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Major
          </Text>

          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            onChangeText={major => this.setState({ major })}
            value={this.state.email}
            maxLength={100}
            ref="major"
            onFocus={this._inputFocused.bind(this, "major")}
            returnKeyType="done"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Tags / Interests
          </Text>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.tagButton}
            // onPress={this._showTagPage.bind(this)}
          >
            <Text
              style={[GlobalStyles.text, styles.textListItem, styles.tagText]}
            >
              {this.props.myProfile &&
              this.props.myProfile.tags &&
              this.props.myProfile.tags.length > 0
                ? this.props.myProfile.tags.join(", ")
                : "none (tap to add)"}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <RectButton
            style={[styles.rectButton, styles.createAccountButton]}
            onPress={GlobalFunctions.openTOS}
            text="Privacy Policy / Terms of Service"
            textStyle={styles.buttonText}
          />
          <RectButton
            style={[styles.rectButton, styles.createAccountButton]}
            onPress={this._createAccountOnPress.bind(this)}
            text="Create Account"
            textStyle={styles.buttonText}
          />

          <View style={styles.bottom}>
            <Text style={styles.aboutText}>
              JumboSmash was brought to you by:{"\n"}
              Devs: {GlobalFunctions.developers() + "\n"}
              Designers: {GlobalFunctions.designers() + "\n\n"}
              Special Thanks To:{"\n" + GlobalFunctions.helpers()}
            </Text>
          </View>
          <View style={styles.hiddenText}>
            <Text style={{ textAlign: "center" }}>🍆🍑</Text>
          </View>
        </ScrollView>

        {/* <Button onPress={pop} title="< Back to Home" />
        <Button onPress={counter} title="Go to Redux Counter >" /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  textListItem: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 15
  },
  header: {
    paddingTop: 12,
    paddingBottom: 9,
    fontWeight: "600"
  },
  textInput: {
    height: 42,
    color: GlobalFunctions.style().darkGray
  },
  line: {
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: GlobalFunctions.style().lightGray
  },
  tagText: {
    alignItems: "center",
    color: GlobalFunctions.style().darkGray,
    paddingTop: 10,
    paddingBottom: 10
  },
  bottom: {
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 16
  },
  rectButton: {
    height: 70,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 5
  },
  createAccountButton: {
    backgroundColor: GlobalFunctions.style().color
  },
  aboutText: {
    textAlign: "center",
    opacity: 0.5
  },
  hiddenText: {
    position: "absolute",
    bottom: -150,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "600"
  }
});

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user
});
export default connect(mapStateToProps)(createProfile);

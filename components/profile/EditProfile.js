import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StyleSheet
} from "react-native";
import Header from "../common/Header";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { onSaveChanges } from "../../store/actions/profile/ProfileAction";
import * as ImagePicker from "expo-image-picker";
import Firebase, { db } from "../../Fire";

class EditProfile extends Component {
  state = {
    userpic: "",
    name: "",
    username: "",
    web: "",
    bio: "",
    phone: "",
    sex: ""
  };
  cancelEdit() {
    Actions.pop();
  }
  UNSAFE_componentWillMount() {
    console.log(this.props);
    this.setState({
      userpic: this.props.userpic,
      name: this.props.name_profile,
      username: this.props.username,
      web: this.props.web,
      bio: this.props.bio,
      phone: this.props.phone,
      sex: this.props.sex
    });
  }
  onChangeName(text) {
    this.setState({
      name: text
    });
  }
  onChangeUsername(text) {
    this.setState({
      username: text
    });
  }

  onChangeBio(text) {
    this.setState({
      bio: text
    });
  }

  onChangePhone(text) {
    this.setState({
      phone: text
    });
  }

  onChangeSex(text) {
    this.setState({
      sex: text
    });
  }

  onChangeBio(text) {
    this.setState({
      bio: text
    });
  }

  onChangeWeb(text) {
    this.setState({
      web: text
    });
  }
  _uploadPhotoToFirebase(image) {
    this.setState({
      userpic: image
    });
    return new Promise(async (resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? image.replace("file://", "") : image;
      const { currentUser } = Firebase.auth();

      const response = await fetch(uploadUri);
      const blob = await response.blob();
      console.log(blob);
      const imageRef = Firebase.storage()
        .ref(`/images/${currentUser.uid}`)
        .child("profile_pic");
      const unsubscribe = imageRef.put(blob).on(
        "state_changed",
        state => {},
        err => {
          unsubscribe();
          rej(err);
        },
        async () => {
          unsubscribe();
          const url = await imageRef.getDownloadURL();
          res(url);
        }
      );
    });
  }

  selectPhotoTapped() {
    ImagePicker.launchImageLibraryAsync({
      width: 700,
      height: 700,
      cropping: true,
      compressImageQuality: 0.6
    }).then(image => {
      if (image) {
        this._uploadPhotoToFirebase(image.uri);
        // this._uploadSmallerImage(image.uri, index);
      }
    });
  }

  onUploadImage() {}
  onSaveChanges() {
    this.props.onSaveChanges(
      this.state.userpic,
      this.state.name,
      this.state.username,
      this.state.web,
      this.state.bio,
      this.state.phone,
      this.state.sex
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Edit profile"
          onNext={this.onSaveChanges.bind(this)}
          onCancel={this.cancelEdit.bind(this)}
        />
        <ScrollView>
          <View style={styles.pic}>
            <Image
              source={{ uri: this.state.userpic }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={this.selectPhotoTapped.bind(this)}
            >
              <View>
                <Text style={{ fontSize: 15, color: "#00a8ff" }}>
                  Change profile pic
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.publicInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 10,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                Name
              </Text>
              <TextInput
                style={{
                  margin: 5,
                  width: 250,
                  height: 40,
                  borderBottomColor: "#dcdde1",
                  borderBottomWidth: 1
                }}
                value={this.state.name}
                onChangeText={this.onChangeName.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                Username
              </Text>
              <TextInput
                style={{
                  margin: 5,
                  width: 250,
                  height: 40,
                  borderBottomColor: "#dcdde1",
                  borderBottomWidth: 1
                }}
                value={this.state.username}
                onChangeText={this.onChangeUsername.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                Web
              </Text>
              <TextInput
                style={{
                  margin: 5,
                  width: 250,
                  height: 40,
                  borderBottomColor: "#dcdde1",
                  borderBottomWidth: 1
                }}
                value={this.state.web}
                onChangeText={this.onChangeWeb.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                Bio
              </Text>
              <TextInput
                style={{ margin: 5, width: 250, height: 40 }}
                value={this.state.bio}
                onChangeText={this.onChangeBio.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.privateInfo}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 15,
                marginLeft: 5
              }}
            >
              Private info
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                {" "}
                Phone{" "}
              </Text>
              <TextInput
                style={{
                  margin: 5,
                  width: 250,
                  height: 40,
                  borderBottomColor: "#dcdde1",
                  borderBottomWidth: 1
                }}
                value={this.state.phone}
                onChangeText={this.onChangePhone.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 5,
                  width: 80,
                  height: 40,
                  fontSize: 15
                }}
              >
                {" "}
                Sex{" "}
              </Text>
              <TextInput
                style={{
                  margin: 5,
                  width: 250,
                  height: 40,
                  borderBottomColor: "#dcdde1",
                  borderBottomWidth: 1
                }}
                value={this.state.sex}
                onChangeText={this.onChangeSex.bind(this)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  pic: {
    width: "100%",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#f5f6fa",
    borderBottomColor: "#dcdde1",
    borderBottomWidth: 1
  },
  publicInfo: {
    width: "100%",
    padding: 15,
    borderBottomColor: "#dcdde1",
    borderBottomWidth: 1
  },
  privateInfo: {
    width: "100%",
    padding: 15
  }
});

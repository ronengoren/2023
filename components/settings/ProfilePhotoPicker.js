import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  Platform
} from "react-native";
import CircleButton from "../../components/global/CircleButton";
import * as ImagePicker from "expo-image-picker";

import LoadableImage from "../../components/global/LoadableImage.js";
import ImageResizer from "react-native-image-resizer";
import * as Permissions from "expo-permissions";

import getPermission from "../../utils/getPermission";
import Firebase, { db } from "../../Fire";
import uuid from "uuid";

// import RNFetchBlob from "react-native-fetch-blob";

// const Blob = RNFetchBlob.polyfill.Blob;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;
// const fs = RNFetchBlob.fs;

const PHONE_WIDTH = Dimensions.get("window").width;
const PHONE_HEIGHT = Dimensions.get("window").height;
const LARGE_PHOTO_WIDTH = PHONE_WIDTH * 0.592;
const SMALL_PHOTO_WIDTH = PHONE_WIDTH * 0.267;
const _uploadImage = (uri, index) => {
  // console.log("uri");
  // console.log(uri + "uri");
  // console.log(index + "index");

  console.log("uri");

  return new Promise(async (resolve, reject) => {
    // console.log("Platform.OS");
    // console.log(Platform.OS);

    // console.log("Platform.OS");
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    // let uploadBlob = null;

    const response = await fetch(uploadUri);
    // console.log(response);
    // console.log("response");

    // console.log(response.blob());
    const blob = await response.blob();
    console.log("response");
    console.log(blob);
    console.log("response");

    const imageRef = Firebase.storage()
      .ref(blob)
      .child(uuid.v4());
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
};
// const _uploadImage = (
//   firebase,
//   uri,
//   mime = "application/octet-stream",
//   index
// ) => {
//   return new Promise((resolve, reject) => {
//     // const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
//     const sessionId = new Date().getTime();
//     // let uploadBlob = null;
//     const imageRef = firebase
//       .storage()
//       .ref("images")
//       .child(`${sessionId}`);

//     // fs.readFile(uploadUri, "base64")
//     //   .then(data => {
//     //     return Blob.build(data, { type: `${mime};BASE64` });
//     //   })
//     //   .then(blob => {
//     //     uploadBlob = blob;
//     //     return imageRef.put(blob, { contentType: mime });
//     //   })
//     //   .then(() => {
//     //     uploadBlob.close();
//     //     return imageRef.getDownloadURL();
//     //   })
//     //   .then(url => {
//     //     resolve(url);
//     //   })
//     //   .catch(error => {
//     //     reject(error);
//     //   });
//   });
// };
const options = {
  allowsEditing: true
};

class ProfilePhotoPicker extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      uploadingImageWithIndex: -1
    };
  }
  _photoExists(index) {
    let photos = this.props.photos;
    return (
      photos &&
      photos.length > index &&
      photos[index] &&
      photos[index].large &&
      photos[index].large.length > 0
    );
  }
  _shouldRenderImageWithIndex(index, styles) {
    let isUploading = this.state.uploadingImageWithIndex == index;
    if (this._photoExists(index) || isUploading) {
      return (
        <LoadableImage
          style={styles}
          imageStyle={styles}
          source={isUploading ? null : { uri: this.props.photos[index].large }}
          isImageLoading={this.state.uploadingImageWithIndex == index}
        />
      );
    } else {
      return <View style={styles} />;
    }
  }
  _changePhotoWithIndex(index, newPhoto, isLarge) {
    // Updates the photos on the settings page, not the server.
    // User has to hit save to make changes permanent in the server
    if (this.props.updatePhotos) {
      let newPhotos = this.props.photos
        ? this.props.photos.slice()
        : [
            { large: "", small: "" },
            { large: "", small: "" },
            { large: "", small: "" }
          ];
      if (!newPhotos[index]) {
        newPhotos[index] = { large: "", small: "" };
      }
      if (isLarge) {
        newPhotos[index].large = newPhoto;
      } else {
        newPhotos[index].small = newPhoto;
      }
      this.props.updatePhotos(newPhotos);
    } else {
      Alert.alert(
        "Something went wrong!",
        "We couldn't update your photo :( Try quitting the app and if the issue comes up again, let us know at team@jumbosmash.com",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }
  _uploadingPhotoError(error) {
    console.log(error);
    throw error;
  }
  _uploadPhotoToFirebase(image, index, isLarge) {
    // console.log("image");

    // console.log(image);
    // console.log(index);
    // console.log(isLarge);

    // console.log("image");

    this.setState({
      uploadingImageWithIndex: index
    });

    let imagePath = isLarge ? image.uri : image;
    // let imageMime = isLarge ? image.mime : "image/jpeg";
    // console.log("imagePath");
    // console.log(imagePath);
    // console.log(index);

    // console.log("imagePath");
    // console.log("hry");

    _uploadImage(imagePath, index).then(
      url => {
        this.setState({
          uploadingImageWithIndex: -1
        });
        this._changePhotoWithIndex(index, url, isLarge);
      },
      error => {
        this.setState({
          uploadingImageWithIndex: -1
        });
        this._uploadingPhotoError(error);
      }
    );
  }
  _uploadSmallerImage(image, index) {
    ImageResizer.createResizedImage(image, 100, 100, "JPEG", 100, 0, null)
      .then(resizedImageUri => {
        this._uploadPhotoToFirebase(resizedImageUri, index, false);
      })
      .catch(err => {
        Alert.alert("Small photo error", err, [
          { text: "OK", onPress: () => {} }
        ]);
      });
  }

  _photoButtonPressedForPhotoIndex(index) {
    let actionName = "";

    if (this.state.uploadingImageWithIndex >= 0) {
      actionName = "working";
      Alert.alert(
        "One Sec",
        "Still working on your last photo! Should only take a few more seconds",
        [{ text: "OK", onPress: () => {} }]
      );
    } else if (this._photoExists(index)) {
      // Deleting a photo
      actionName = "deleting";
      this._changePhotoWithIndex(index, null, true);
      this._changePhotoWithIndex(index, null, false);
    } else {
      // Adding a photo, pull up image picker
      actionName = "uploading";
      ImagePicker.launchImageLibraryAsync({
        width: 700,
        height: 700,
        cropping: true,
        compressImageQuality: 0.6
      })
        .then(image => {
          if (image) {
            this._uploadPhotoToFirebase(image, index, true);
            this._uploadSmallerImage(image.uri, index);
          }
        })
        .catch(error => {
          // let userCancelled = error["code"].includes("CANCELLED");
          // if (userCancelled) {
          //   // potentially handle cancelled condition
          //   Analytics.logEvent("photo_upload_cancelled", {
          //     page: "settings"
          //   });
          // } else {
          //   Analytics.logEvent("error", {
          //     name: "photo_upload_error",
          //     page: "settings"
          //   });
          //   Alert.alert(
          //     "Error",
          //     "Couldn't access your photos. Try going to settings and reallowing photo permissions for jumbosmash. If that doesn't work, email us at team@jumbosmash.com",
          //     [{ text: "OK", onPress: () => {} }]
          //   );
          //   throw error;
          // }
        });
    }
    // Analytics.logEvent("change_photo_button", {
    //   action: actionName
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.majorPhotoView}>
          {this._shouldRenderImageWithIndex(0, [
            styles.majorPhoto,
            styles.photo
          ])}
          <CircleButton
            style={styles.majorButton}
            source={
              this._photoExists(0)
                ? require("../../assets/removeButton.png")
                : require("../../assets/addButton.png")
            }
            onPress={() => this._photoButtonPressedForPhotoIndex(0)}
            hasShadow={false}
          />
        </View>
        <View style={styles.minorPhotosContainer}>
          <View style={styles.minorPhotoViewTop}>
            {this._shouldRenderImageWithIndex(1, [
              styles.minorPhoto,
              styles.photo
            ])}
            <CircleButton
              style={[styles.minorButton, { top: SMALL_PHOTO_WIDTH - 15 }]}
              source={
                this._photoExists(1)
                  ? require("../../assets/removeButton.png")
                  : require("../../assets/addButton.png")
              }
              onPress={() => this._photoButtonPressedForPhotoIndex(1)}
              hasShadow={false}
            />
          </View>
          <View style={styles.minorPhotoViewBottom}>
            {this._shouldRenderImageWithIndex(2, [
              styles.minorPhoto,
              styles.photo
            ])}
            <CircleButton
              style={[styles.minorButton, { bottom: -4 }]}
              source={
                this._photoExists(2)
                  ? require("../../assets/removeButton.png")
                  : require("../../assets/addButton.png")
              }
              onPress={() => this._photoButtonPressedForPhotoIndex(2)}
              hasShadow={false}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    padding: 15,
    flexDirection: "row"
  },
  majorPhotoView: {},
  photo: {
    backgroundColor: "#DDDDDD",
    borderRadius: 5
  },
  majorPhoto: {
    width: LARGE_PHOTO_WIDTH,
    height: LARGE_PHOTO_WIDTH,
    marginRight: PHONE_WIDTH * 0.053
  },
  minorPhoto: {
    width: SMALL_PHOTO_WIDTH,
    height: SMALL_PHOTO_WIDTH
  },
  minorPhotosContainer: {
    flexDirection: "column"
  },
  minorPhotoViewTop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  minorPhotoViewBottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  majorButton: {
    position: "absolute",
    height: 35,
    width: 35,
    left: LARGE_PHOTO_WIDTH - 28,
    bottom: -7,
    borderRadius: 18
  },
  minorButton: {
    position: "absolute",
    height: 21,
    width: 21,
    right: -7,
    borderRadius: 11
  }
});

export default ProfilePhotoPicker;

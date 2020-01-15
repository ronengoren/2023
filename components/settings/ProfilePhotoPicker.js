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
import LoadableImage from "../../components/global/LoadableImage.js";
import CircleButton from "../../components/global/CircleButton";

const PHONE_WIDTH = Dimensions.get("window").width;
const PHONE_HEIGHT = Dimensions.get("window").height;
const LARGE_PHOTO_WIDTH = PHONE_WIDTH * 0.592;
const SMALL_PHOTO_WIDTH = PHONE_WIDTH * 0.267;

class ProfilePhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadingImageWithIndex: -1
    };
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

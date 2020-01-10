import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  Button
} from "react-native";
import GlobalStyles from "../global/GlobalStyles";
import Carousel from "react-native-snap-carousel";
import Mailer from "react-native-mail";
import { sliderWidth, itemWidth } from "./styles/SliderEntry.style";
import SliderEntry from "./SliderEntry";
import Firebase from "../../Fire";
import { connect } from "react-redux";

const BORDER_RADIUS = 10;
const CLOSE_SCROLL_DISTANCE = 100;
const REPORT_OPTION = "Report User";
const BLOCK_OPTION = "Block User";
const ACTION_SHEET_OPTIONS = ["Cancel", REPORT_OPTION, BLOCK_OPTION];
const WIDTH = Dimensions.get("window").width;
const IS_ANDROID = Platform.OS === "android";
const NAVBAR_HEIGHT = IS_ANDROID ? 54 : 64; // TODO: check the android tabbar height
const PAGE_HEIGHT = Dimensions.get("window").height - NAVBAR_HEIGHT;
const SLIDER_1_FIRST_ITEM = 1;

export const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg"
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg"
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg"
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg"
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg"
  },
  {
    title: "Middle Earth, Germany",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/lceHsT6l.jpg"
  }
];
class ProfileCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      currentUser: null
    };
  }
  componentDidMount() {
    const { currentUser } = Firebase.auth();
    this.setState({ currentUser });
  }
  handleSignout = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("LoginPage");
  };
  _closeProfileCard() {
    if (this.props.exitFunction) {
      this.props.exitFunction();
    }
  }
  _shouldRenderImageWithIndex(index) {
    let imageContainerHeight = (this.props.pageHeight * 3) / 4;
    return (
      <View style={[styles.imageView, { height: imageContainerHeight }]}>
        <Image
          style={styles.topGradient}
          source={require("../../assets/topGradient.png")}
        />
      </View>
    );
  }

  _renderImages(number, title) {
    let imageContainerHeight = (this.props.pageHeight * 3) / 4;
    const { slider1ActiveSlide } = this.state;

    return (
      <Carousel
        style={styles.carousel}
        ref={c => (this._slider1Ref = c)}
        data={ENTRIES1}
        renderItem={this._renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        loop={false}
        animate={false}
      />
    );
  }
  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  _shouldRenderSafeNameText() {
    let email = this.props.email.toLowerCase();
  }

  render() {
    let pageHeight = this.props.pageHeight;

    let _scrollView: ScrollView;
    const example1 = this._renderImages(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={{ flex: 1 }}>
          <View style={[GlobalStyles.absoluteCover, styles.background]} />
        </View>
        <View style={[GlobalStyles.absoluteCover]}>
          <ScrollView
            style={styles.touchArea}
            ref={scrollView => {
              _scrollView = scrollView;
            }}
          >
            <View style={[styles.card, { minHeight: BORDER_RADIUS }]}>
              {example1}
              <Text>{this.props.user.email}</Text>

              <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={this._closeProfileCard.bind(this)}
              >
                <View style={styles.textContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={[GlobalStyles.boldText, styles.title]}>
                      {this.props.firstName} {this.props.lastName}{" "}
                      {/* {this._shouldRenderSafeNameText()} */}
                    </Text>
                    <Button title="Logout" onPress={this.handleSignout()} />
                  </View>
                  <Text style={[GlobalStyles.subtext, styles.subTitle]}>
                    {this.props.major}
                  </Text>
                  <Text style={[GlobalStyles.text, styles.text]}>
                    {this.props.description}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <Image
                style={styles.bottomGradient}
                source={require("../../assets/bottomGradient.png")}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this._closeProfileCard.bind(this)}
              >
                <Image
                  style={styles.closeButtonView}
                  source={require("../../assets/x.png")}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeButton: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  closeButtonView: {
    resizeMode: "contain",
    height: 15,
    width: 15,
    flex: 1
  },
  moreButton: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  moreButtonView: {
    resizeMode: "contain",
    height: 30,
    width: 30,
    flex: 1
  },
  topGradient: {
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    height: 71,
    width: WIDTH,
    opacity: 0.8
  },
  bottomGradient: {
    position: "absolute",
    resizeMode: "cover",
    bottom: 0,
    height: 53,
    width: WIDTH,
    opacity: 0.6
  },
  background: {
    backgroundColor: "black",
    opacity: 0.8
  },
  touchArea: {
    flex: 1
  },
  card: {
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    backgroundColor: "#FBFBFB",
    elevation: 2,
    flex: 1
  },
  carousel: {
    flex: 1,
    width: WIDTH,
    height: 25
  },
  imageView: {
    overflow: "hidden",
    width: WIDTH
  },
  image: {
    width: WIDTH
  },
  textContainer: {
    backgroundColor: "white"
  },
  titleContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: 7
  },
  title: {},
  check: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginLeft: 3,
    marginBottom: 4
  },
  subTitle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50
  },
  safetyNameText: {
    opacity: 0.5,
    fontSize: 15,
    fontWeight: "100"
  }
});
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(ProfileCardView);

// export default ProfileCardView;

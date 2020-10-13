import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
//import LinearGradient from "react-native-linear-gradient";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, {colors} from './styles/index.style';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class connectliftgallery1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({item, index}) {
    return <SliderEntry data={item} even={false} />;
  }

  layoutboukdgallery1(number, title, type) {
    const isTinder = type === 'tinder';
    return (
      <View
        style={[
          styles.connectliftgallery1Container,
          isTinder
            ? styles.connectliftgallery1ContainerDark
            : styles.connectliftgallery1ContainerLight,
        ]}>
        <Text
          style={[
            styles.title,
            isTinder ? {} : styles.titleDark,
          ]}>{`* ${number} *`}</Text>

        <Carousel
          data={this.props.images1x}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
        <View style={{flex: 1}}>
          <Text>boukd </Text>
          <Text>Facebook</Text>
          <Text>Twitter</Text>
          <Text>Instagram</Text>
        </View>
      </View>
    );
  }

  render() {
    const connectliftgallery13 = this.layoutboukdgallery1(
      'Gallery',
      '"Stack of cards" ',
      'stack',
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}>
            {connectliftgallery13}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

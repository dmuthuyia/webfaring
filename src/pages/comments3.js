import React, {Component} from 'react';

import {
  Button,
  Text,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';

const h = Dimensions.get('window').height;
const modalHeight = (90 * h) / 100;

export default class Comment extends Component {
  constructor(props) {
    super(props);
    //this._renderPage = this._renderPage.bind(this);
  }

  componentWillMount() {
    this.animate = new Animated.Value(0);
    this.animatedMargin = new Animated.Value(0);
    this.scrollOffset = 0;
    this.contentHeight = 0;
    this.scrollViewHeight = 0;

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dy} = gestureState;
        const totalScrollHeight = this.scrollOffset + this.scrollViewHeight;
        if (
          (this.scrollOffset <= 0 && dy > 0) ||
          (totalScrollHeight >= this.contentHeight && dy < 0)
        ) {
          return true;
        }
      },
      onPanResponderMove: (e, gestureState) => {
        const {dy} = gestureState;
        if (dy < 0) {
          this.animate.setValue(dy);
        } else if (dy > 0) {
          this.animatedMargin.setValue(dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const {dy} = gestureState;

        if (dy < -150) {
          Animated.parallel([
            Animated.timing(this.animate, {
              toValue: -400,
              duration: 150,
            }),
          ]).start();
        } else if (dy > -150 && dy < 150) {
          Animated.parallel([
            Animated.timing(this.animate, {
              toValue: 0,
              duration: 150,
            }),
            Animated.timing(this.animatedMargin, {
              toValue: 0,
              duration: 150,
            }),
          ]).start();
        } else if (dy > 150) {
          Animated.timing(this.animate, {
            toValue: 400,
            duration: 300,
          }).start();
        }
      },
    });
  }

  render() {
    const spacerStyle = {
      marginTop: this.animatedMargin,
    };
    const opacityInterpolate = this.animate.interpolate({
      inputRange: [-400, 0, 400],
      outputRange: [0, 1, 0],
    });

    const modalStyle = {
      transform: [{translateY: this.animate}],
      opacity: opacityInterpolate,
    };
    return (
      <View style={styles.Container}>
        <Animated.View style={spacerStyle} />
        <Animated.View
          style={[styles.modal, modalStyle]}
          {...this.panResponder.panHandlers}>
          <View style={styles.comments}>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={event => {
                this.scrollOffset = event.nativeEvent.contentOffset.y;
                this.scrollViewHeight =
                  event.nativeEvent.loyoutMeasurement.height;
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.contentHeight = contentHeight;
              }}>
              <Text style={styles.fakeText}>Top</Text>
              <View style={styles.fakeText} />
              <Text style={styles.fakeText}>Bottom</Text>
            </ScrollView>
          </View>
          <View style={styles.inputWrap}>
            <TextInput style={styles.textInput} paceholder="enter" />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
    height: modalHeight,
  },
  inputWrap: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textInput: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  comments: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

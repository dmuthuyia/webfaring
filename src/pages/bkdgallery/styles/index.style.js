import {StyleSheet} from 'react-native';

export const colors = {
  black: '#4c1037',
  gray: 'black',
  background1: 'red',
  background2: 'black',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.black
  },
  container: {
    flex: 1,
    //backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  connectliftgallery1Container: {
    paddingVertical: 30,
  },
  connectliftgallery1ContainerDark: {
    //backgroundColor: colors.black
  },
  connectliftgallery1ContainerLight: {
    //backgroundColor: "red"
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

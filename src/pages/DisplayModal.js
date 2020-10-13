// DisplayModal.js

import React, {Component} from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Assets from '../assets/assets';

const h = Dimensions.get('window').height;
const modalHeight = (90 * h) / 100;

class WhipUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      display: false,
    };
  }

  triggerModal = UserName => {
    this.setState(prevState => {
      return {
        display: true,
        userId: UserName,
      };
    });
  };

  renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 20,
          margin: 4,
          backgroundColor: '#eeedf9',
        }}
        //onPress={() => ToastAndroid.show(item.UserName, ToastAndroid.SHORT)}
      >
        <View style={{justifyContent: 'center', alignItems: 'stretch'}}>
          <Image
            style={{
              width: 60,
              height: 60,
              margin: 5,
              borderRadius: 30,
            }}
            source={{
              uri: 'https://boukd.com/apps/boukd/images/avatar/' + item.mypic,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#e2e2f7',
              borderTopRightRadius: 50,
              alignSelf: 'flex-start',
              paddingLeft: 5,
              paddingRight: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#05087f',
                marginBottom: 1,
              }}>
              {item.UserName}
            </Text>
          </View>
          <Text style={{fontSize: 16, color: 'black', padding: 2}}>
            {item.description}
          </Text>
          <View style={styles.comReactWrapper}>
            <View style={styles.comReactButton}>
              <Image
                source={Assets.connectliftlove1}
                style={styles.drawerico}
              />
              <Text>10</Text>
            </View>
            <View style={styles.comReactButton}>
              <Image
                source={Assets.connectlifthate1}
                style={styles.drawerico}
              />
              <Text>1</Text>
            </View>
            <TouchableOpacity
              style={styles.comReactButton}
              onPress={this.triggerModal.bind(this, item.UserName)}>
              <Image
                source={Assets.connectliftcomment1}
                style={styles.drawerico}
              />
              <Text>23</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'gray'}} />;
  };

  componentDidMount() {
    fetch('https://boukd.com/apps/boukd/response.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        // we will pass our search data to server
        whistle_id: '1',

        //whistle_id: 1
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          //keyExtractor={(item, index) => "list-item-${index}"}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const DisplayModal = props => (
  <Modal
    visible={props.display}
    animationType="slide"
    onRequestClose={() => {
      DisplayModal(false);
    }}
    transparent={true}>
    <View style={styles.modal}>
      <View style={{flex: 1}}>
        <Button
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('WhipUp')}
          title="Go back"
        />
        <WhipUp />
        <View>
          <TextInput placeholder="Comment" />
          <Button
            style={styles.buttonContainer}
            onClick={() => props.parentMethod}
            title="Post"
          />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020202',
    flex: 1,
  },
  modal: {
    borderRadius: 2,
    borderColor: '#020202',
    borderWidth: 2,
    margin: 10,
    height: modalHeight,
    justifyContent: 'space-between',
    backgroundColor: '#020202',
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
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  buttonContainer: {
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupTextCont: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  signupButton: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '500',
  },
  comReactWrapper: {
    width: 500,
    flexDirection: 'row',
    borderColor: '#fff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  comReactButton: {
    color: 'green',
    fontSize: 12,
    width: 60,
    flexDirection: 'row',
  },
  drawerico: {
    width: 15,
    height: 15,
    margin: 5,
    opacity: 0.6,
  },
  footer: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
});

export default DisplayModal;

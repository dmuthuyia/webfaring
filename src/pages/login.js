/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../components/logo';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      loginError: '',
      currentUserId: '',
      currentUserName: '',
      currentUserDp: '',
    };
  }

  startSession = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'Yes');
    await AsyncStorage.setItem('currentUserId', this.state.currentUserId);
    await AsyncStorage.setItem('currentUserName', this.state.currentUserName);
    await AsyncStorage.setItem('currentUserDp', this.state.currentUserDp);
    //alert(this.state.currentUserName);
  };

  loginUser = () => {
    const {userEmail, userPassword} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userEmail == '') {
      alert('Please enter Email address');
      //this.setState({ loginError: "Please enter Email address" });
      //alert(this.state.loginError);
    } else if (reg.test(userEmail) === false) {
      alert('Email is Not Correct');
      //this.setState({ loginError: "Email is Not Correct" });
      //alert(this.state.loginError);
      return false;
    } else if (userPassword == '') {
      alert('Please enter password');
      //this.setState({ loginError: "Please enter password" });
      //alert(this.state.loginError);
    } else {
      fetch('https://boukd.com/apps/boukd/login.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          // we will pass our input data to server
          email: userEmail,
          password: userPassword,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson != 'Wrong Details' && responseJson != 'try again') {
            // redirect to Dashboard
            //alert("Successfully Login");
            //await AsyncStorage.setItem("isLoggedIn", "1");
            //alert(JSON.stringify(responseJson));

            //alert(responseJson[0].UserName);

            this.setState({
              currentUserId: responseJson[0].id,
              currentUserName: responseJson[0].UserName,
              currentUserDp: responseJson[0].mypic,
            });

            this.startSession();
            this.props.navigation.navigate('Dashboard');
          } else {
            alert('Wrong Login Details');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    Keyboard.dismiss();
  };

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter email"
            placeholderTextColor="rgba(255,255,255,0.8)"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={userEmail => this.setState({userEmail})}
            onSubmitEditing={() => this.refs.txtPassword.focus()}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="go"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={userPassword => this.setState({userPassword})}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={this.loginUser}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>You don't have an account yet?</Text>
          <Text
            style={styles.signupButton}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Sign up
          </Text>
          <Text
            style={(styles.signupButton, {left: 10, color: 'green'})}
            onPress={() => this.props.navigation.navigate('Dashboard')}>
            | Skip
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020202',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  buttonContainer: {
    width: 250,
    backgroundColor: '#92ca2c',
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#020202',
    borderWidth: 2,
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
    fontSize: 12,
  },
  signupButton: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '500',
  },
});

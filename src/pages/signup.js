/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Logo from '../components/logo';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userPassword: '',
    };
  }

  userRegister = () => {
    //alert("yo");
    const {userName} = this.state;
    const {userEmail} = this.state;
    const {userPassword} = this.state;
    fetch('https://boukd.com/apps/boukd/register.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        UserName: userName,
        email: userEmail,
        password: userPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJsonFromServer => {
        if (responseJsonFromServer == 'User Registered Successfully') {
          alert(responseJsonFromServer);
          this.props.navigation.navigate('Login');
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.error(error);
      });

    //onButtonPress = () => this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter username"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={userName => this.setState({userName})}
            onSubmitEditing={() => this.refs.txtPassword.focus()}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter email"
            placeholderTextColor="rgba(255,255,255,0.8)"
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
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
            ref={'txtPassword'}
            onChangeText={userPassword => this.setState({userPassword})}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Confirm password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="go"
            secureTextEntry={true}
            autoCorrect={false}
            ref={'txtPassword'}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.userRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already registered?</Text>
          <Text
            style={styles.signupButton}
            onPress={() => this.props.navigation.navigate('Login')}>
            Sign in
          </Text>

          <Text
            style={(styles.signupButton, {left: 10, color: 'green'})}
            onPress={() => this.props.navigation.navigate('Dashboard')}>
            | Back
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020202',
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#020202',
    justifyContent: 'center',
    alignItems: 'center',
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

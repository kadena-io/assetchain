import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";

export default class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="#2699FB"
            autoCapitalize="none"
            textAlign="center"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#2699FB"
            autoCapitalize="none"
            textAlign="center"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.loginHandler}
          >
            <Text style={styles.submitButtonText}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "#BCE0FD",
    borderWidth: 1,
    color: "#2699FB"
  },
  submitButton: {
    backgroundColor: "#2699FB",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});

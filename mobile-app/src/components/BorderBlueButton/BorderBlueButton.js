import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class BorderBlueButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        {this.props.buttonType == 1 ? (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.touchableText}>{this.props.title}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchableText}>{this.props.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    height: 50,
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30
  },
  touchableText: {
    color: "#2699FB",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default BorderBlueButton;

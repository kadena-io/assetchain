import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.touchable,
          {
            width: this.props.size,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor
          }
        ]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.touchableText, { color: this.props.textColor }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 2
  },
  touchableText: {
    color: "#2699FB",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default CustomButton;

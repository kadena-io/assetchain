import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ButtonWithNavigation = props => (
  (onItemPressedHandler = key => {
    props.navigator.push({
      screen: props.screen,
      title: props.screenHeader,
      passProps: {},
      navigatorStyle: { tabBarHidden: true }
    });
  }),
  (
    <View style={styles.reviewButtonContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onItemPressedHandler}>
        <Text style={styles.touchableText}>{props.buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
);

const styles = StyleSheet.create({
  touchableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  reviewButtonContainer: {
    alignItems: "center"
  },
  touchable: {
    height: 50,
    width: "87%",
    alignItems: "center",
    backgroundColor: "#2699FB",
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4,
    marginBottom: 40
  }
});

export default ButtonWithNavigation;

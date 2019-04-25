import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const listItem = props => (
  (onItemPressedHandler = key => {
    props.navigator.push({
      screen: props.screen,
      title: props.screenHeader,
      passProps: {
        nextScreen: props.nextScreen,
        screenHeader: props.screenHeader
      },
      navigatorStyle: { tabBarHidden: true }
    });
  }),
  (
    <TouchableOpacity onPress={onItemPressedHandler}>
      <View style={styles.listItem}>
        <Icon
          size={30}
          name={props.itemImage}
          color="#2699FB"
          style={styles.itemImage}
        />
        <Text style={styles.textItem}>{props.itemName}</Text>
      </View>
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFF",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  itemImage: {
    marginRight: 8,
    width: 30,
    height: 30
  },
  textItem: {
    color: "#2699FB"
  }
});

export default listItem;

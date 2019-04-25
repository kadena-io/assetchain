import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";

export default class OwnershipCreatedModal extends Component {
  setCreatedModalVisible = () => {
    this.props.handleCreatedModal();
  };

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.createdModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setCreatedModalVisible(); //it shouldn't be like this, but for now it's okey
          }}
        >
          <TouchableOpacity onPress={this.setCreatedModalVisible}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 50,
                backgroundColor: "#F1F9FF",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name="ios-checkmark"
                type="ionicon"
                color="#2699FB"
                size={35}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

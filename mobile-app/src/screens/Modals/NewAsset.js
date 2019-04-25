import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";

export default class NewAssetModal extends Component {
  setModalVisible = () => {
    this.props.handleNewAssetModal();
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.isNewAssetModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setModalVisible();
        }}
      >
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="New Asset ID"
          placeholderTextColor="#2699FB"
          autoCapitalize="none"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.setModalVisible}
          >
            <Text style={styles.submitButtonText}> Cancel </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.setModalVisible}
          >
            <Text style={styles.submitButtonText}> Create </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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

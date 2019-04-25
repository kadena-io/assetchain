import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, Alert } from "react-native";
import { Icon } from "react-native-elements";

export default class TransferOwnerModal extends Component {
  setModalVisible = () => {
    this.props.handleTransferOwnerModal();
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(); //it shouldn't be like this, but for now it's okey
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World mustafa!</Text>
            </View>
            <View
              style={{
                //flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              <TouchableOpacity onPress={this.setModalVisible}>
                <View>
                  <Icon
                    reverse
                    name="ios-close"
                    type="ionicon"
                    color="#517fa4"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.setModalVisible}>
                <View>
                  <Icon
                    reverse
                    name="ios-checkmark"
                    type="ionicon"
                    color="#517fa4"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
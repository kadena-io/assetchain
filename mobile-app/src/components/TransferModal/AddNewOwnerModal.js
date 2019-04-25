import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomButton/CustomButton";

class AddNewOwnerModal extends Component {
  state = {
    newReceiverId: ""
  };
  _toggleModal = () => this.props.onNewOwnerAdded();

  onCreate = () => {
    this._toggleModal();
    this.props.handleNewReceiver(this.state.newReceiverId);
  };

  handleNewReceiverInput = text => {
    this.setState({ newReceiverId: text });
  };

  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.modalContent}>
            <View style={{ marginTop: 20 }}>
              <TextInput
                placeholderTextColor="#2699FB"
                style={styles.ownerIdInput}
                onChangeText={this.handleNewReceiverInput}
                placeholder="Owner’s Name"
              />
            </View>
            <View style={styles.touchableContainer}>
              <Text style={styles.touchableText}>Related Asset: REA1</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 200,
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: 320
                }}
              >
                <CustomButton
                  title="Cancel"
                  size={96}
                  height={40}
                  onPress={this._toggleModal}
                  textColor="#2699FB"
                />
                <CustomButton
                  title="Create"
                  size={96}
                  height={40}
                  backgroundColor="#2699FB"
                  textColor="white"
                  onPress={this.onCreate}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    height: 497,
    width: 327,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  touchableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  touchable: {
    height: 50,
    width: 263,
    backgroundColor: "#2699FB",
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4,
    alignItems: "center"
  },
  touchableContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  ownerIdInput: {
    borderWidth: 1,
    borderColor: "#BCE0FD",
    width: 223,
    height: 50,
    color: "#2699FB"
  }
});

export default AddNewOwnerModal;

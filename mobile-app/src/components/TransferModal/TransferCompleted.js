import React, { Component } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";

class TransferCompletedModal extends Component {
  setModalVisible = () => {
    this.props.setSubModalVisible();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.InfoModelVisible} style={{ margin: 0 }}>
          <View style={styles.modalContainer}>
            <View
              style={{
                alignItems: "center",
                marginTop: 117
              }}
            >
              <View
                style={{
                  height: 434,
                  width: 345,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center"
                }}
              >
                <View style={{ marginTop: 1 }}>
                  <Icon
                    reverse
                    name="ios-checkmark"
                    type="ionicon"
                    size={150}
                    color="white"
                    reverseColor="#2699FB"
                  />
                </View>
                <View>
                  <Text
                    style={{ marginTop: 1, color: "#2699FB", fontSize: 14 }}
                  >
                    {this.props.infoMessage}
                  </Text>
                </View>
                <View style={styles.touchableContainer}>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={this.setModalVisible}
                  >
                    <Text style={styles.touchableText}>
                      {this.props.buttonTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F0F9FF"
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
  }
});

export default TransferCompletedModal;

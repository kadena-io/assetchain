import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import TransferCompletedModal from "./TransferCompleted";

export default class ModalTester extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isVisible} style={{ margin: 0 }}>
          <View style={styles.modalContainer}>
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewText}>Review Your Transfer</Text>
            </View>
            <View style={styles.transferDetailBox}>
              <View style={{ marginLeft: 155, marginTop: 10 }}>
                <Text style={{ color: "#2699FB", fontSize: 14 }}>
                  Related Asset
                </Text>
                <Text style={styles.assetNameText}>
                  {this.props.ownerAssetId}
                </Text>
              </View>
              <View style={styles.textValuesContainer}>
                <View style={{ marginLeft: 45 }}>
                  <Text style={styles.valuesText}>From</Text>
                  <Text style={styles.fromToText}>
                    {this.props.transferData.ownerId}
                  </Text>
                </View>
                <View>
                  <Icon
                    reverse
                    name="md-arrow-forward"
                    type="ionicon"
                    color="#FFFFFF"
                    reverseColor="#2699FB"
                    size={45}
                  />
                </View>
                <View style={{ marginRight: 45 }}>
                  <Text style={styles.valuesText}>To</Text>
                  <Text style={styles.fromToText}>
                    {this.props.transferData.receiverId}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 178 }}>
                <Text style={{ color: "#2699FB" }}>
                  {this.props.transferData.tokenAmount}
                </Text>
                <Text style={styles.fromToText}>Token</Text>
              </View>
            </View>
            <View style={styles.confirmBox}>
              <View
                style={{ marginTop: 25, marginLeft: 20, alignItems: "center" }}
              >
                <Text style={styles.fromToText}>
                  Do you want to continue to the
                </Text>
                <Text style={styles.fromToText}>transaction?</Text>
              </View>
              <View style={styles.touchableContainer}>
                <TouchableOpacity
                  onPress={this.props.handleTransferModal}
                  style={styles.touchableButtonClose}
                >
                  <Icon
                    reverse
                    name="ios-close"
                    type="ionicon"
                    color="white"
                    reverseColor="#2699FB"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.props.setSubModalVisible}
                  style={styles.touchableButtonConfirm}
                >
                  <Icon
                    reverse
                    name="ios-checkmark"
                    type="ionicon"
                    color="#F1F9FF"
                    reverseColor="#2699FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TransferCompletedModal
          navigator={this.props.navigator}
          buttonTitle="Go To Asset Transaction History"
          infoMessage="Transfer is completed."
          InfoModelVisible={this.props.transferInfoModelVisible}
          setSubModalVisible={this.props.setSubModalVisible}
        />
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
  transferDetailBox: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    height: 230,
    borderRadius: 6,
    alignContent: "center",
    marginLeft: 15,
    marginRight: 15
  },
  touchableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  reviewButtonContainer: {
    margin: 24
  },
  touchable: {
    height: 50,
    backgroundColor: "#2699FB",
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4,
    alignItems: "center"
  },
  confirmBox: {
    marginTop: 45,
    height: 217,
    width: 320,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 6
  },
  reviewTextContainer: {
    marginTop: 30,
    alignContent: "center",
    marginLeft: 125,
    marginRight: 116
  },
  reviewText: {
    fontSize: 16,
    color: "#2699FB",
    fontWeight: "bold"
  },
  textValuesContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  valuesText: {
    color: "#2699FB",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 28
  },
  assetNameText: {
    marginLeft: 10,
    color: "#2699FB",
    fontSize: 14,
    fontWeight: "bold"
  },
  fromToText: {
    color: "#2699FB",
    fontSize: 16
  },
  touchableButtonClose: {
    width: 56,
    height: 56,
    borderRadius: 30,
    marginLeft: 70,
    borderWidth: 1,
    borderColor: "#F1F9FF",
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  touchableButtonConfirm: {
    width: 56,
    height: 56,
    borderRadius: 30,
    marginRight: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  touchableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40
  }
});

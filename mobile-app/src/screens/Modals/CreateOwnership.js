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
import TransferCompletedModal from "../../components/TransferModal/TransferCompleted";

export default class CreateOwnershipModal extends Component {
  setModalVisible = () => {
    this.props.setSubModalVisible();
  };

  render() {
    const { height } = Dimensions.get("window");
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            this.props.handleOwnershipModal(); //it shouldn't be like this, but for now it's okey
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#F0F9FF" }}>
            <View>
              <Text style={styles.modalHeader}>Create Ownership</Text>
            </View>
            <View
              style={{
                padding: 10,
                height: "20%",
                backgroundColor: "#FFFFFF",
                borderColor: "#2699FB",
                alignSelf: "center",
                marginTop: "20%",
                flexDirection: "row",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
            >
              <View
                style={{
                  padding: 25,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "#2699FB",
                    fontWeight: "bold"
                  }}
                >
                  Owner
                </Text>
                <Text
                  style={{
                    color: "#2699FB"
                  }}
                >
                  {this.props.OwnerID}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 25
                }}
              >
                <Icon
                  reverse
                  name="ios-arrow-forward"
                  type="ionicon"
                  color="#FFFFFF"
                  reverseColor="#2699FB"
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#2699FB"
                  }}
                >
                  {this.props.NumberofToken} Tokens
                </Text>
              </View>
              <View
                style={{
                  padding: 25,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "#2699FB",
                    fontWeight: "bold"
                  }}
                >
                  Asset
                </Text>
                <Text
                  style={{
                    color: "#2699FB"
                  }}
                >
                  {this.props.AssetID}
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 25,
                height: "20%",
                width: "70%",
                backgroundColor: "#FFFFFF",
                borderColor: "#2699FB",
                alignSelf: "center",
                marginTop: height * 0.15,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignContent: "center"
                }}
              >
                <Text style={styles.container}>
                  Do you want to continue to the process?
                </Text>
              </View>
              <View
                style={{
                  //flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 30,
                  padding: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.handleOwnershipModal()}
                >
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 50,
                      backgroundColor: "#FFFFFF",
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: "#F1F9FF",
                      borderWidth: 1
                    }}
                  >
                    <Icon
                      name="ios-close"
                      type="ionicon"
                      color="#2699FB"
                      size={35}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.setModalVisible}>
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
              </View>
            </View>
          </View>
        </Modal>
        <TransferCompletedModal
          navigator={this.props.navigator}
          buttonTitle="Go To Transfer"
          infoMessage="Owner is created."
          InfoModelVisible={this.props.createdOwnerInfoModelVisible}
          setSubModalVisible={this.props.setSubModalVisible}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    color: "#2699FB",
    fontSize: 14,
    fontFamily: "Arial"
  },
  modalHeader: {
    textAlign: "center",
    color: "#2699FB",
    fontWeight: "bold",
    paddingTop: 50
  }
});

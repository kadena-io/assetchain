import React from "react";
import { connect } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import TransferModal from "../../components/TransferModal/TransferModal";
import AddNewOwnerModal from "../../components/TransferModal/AddNewOwnerModal";

import {
  getOwnership,
  getOwners,
  handleReceiverId,
  handleNumberofToken,
  handleTransferSubmit
} from "../../store/actions/transfer";
import { getAllOwnerships } from "../../store/actions/ownerTxHistory";

const placeholderforReceiver = {
  label: "Select a Receiver",
  value: null,
  color: "#2699FB"
};

const placeholderforSender = {
  label: "Select a Sender",
  value: null,
  color: "#2699FB"
};

const receiverids = [
  {
    label: "+ Add New Owner Profile",
    value: "+ Add New Owner Profile"
  },
  {
    label: "AHMET",
    value: "ahmet"
  },
  {
    label: "GERAH",
    value: "gerah"
  },
  {
    label: "ASLI",
    value: "aslı"
  }
];

class TransferScreen extends React.Component {
  state = {
    OwnerID: "",
    ReceiverID: "",
    NumberofToken: "",
    isNewReceiverInputVisible: false,
    isOwnerAssetInfoVisible: false,
    modalVisible: false,
    ownerAssetId: "",
    addNewOwnerModalVisible: false,
    receiverids: receiverids,
    selectedReceiverValue: ""
  };

  componentDidMount() {
    this.props.getAllOwnerships();
  }

  handleSelectionFrom = text => {
    this.props.getOwnership(text);
  };

  handleOwnerID = text => {
    this.setState({ OwnerID: text });
  };

  handleTransferModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleTransferOwnerModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleReceiverID = text => {
    this.props.handleReceiverId(text);
  };

  handleNewReceiverID = text => {
    this.setState({ ReceiverID: text });
  };
  handleNumberofToken = text => {
    this.props.handleNumberofToken(text);
  };

  login = (ownerid, receiverid, token) => {
    alert(
      "OwnerID: " +
        ownerid +
        " ReceiverID: " +
        receiverid +
        " NumberofToken:" +
        token
    );
  };

  onNewOwnerAdded = () => {
    this.setState({
      addNewOwnerModalVisible: !this.state.addNewOwnerModalVisible
    });
  };

  setSubModalVisible = () => {
    const data = {
      from: this.props.transferData.ownerId,
      to: this.props.transferData.receiverId,
      quantity: this.props.transferData.tokenAmount
    };
    this.props.handleTransferSubmit(data);
    this.setState({
      transferInfoModelVisible: !this.state.transferInfoModelVisible,
      modalVisible: false
    });
    this.props.navigator.push({
      screen: "DRET.AssetSelectionScreen",
      title: "Asset Transaction History",
      passProps: {},
      navigatorStyle: { tabBarHidden: true }
    });
  };

  handleNewReceiver = newReceiverId => {
    this.setState({
      receiverids: [
        ...this.state.receiverids,
        {
          label: newReceiverId,
          value: newReceiverId
        }
      ],
      selectedReceiverValue: newReceiverId
    });
  };

  render() {
    let selectedOwnerFrom = (
      <View>
        <Text
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10,
            marginBottom: 1,
            fontSize: 14,
            color: "#85144b"
          }}
        >
          Related Asset: {this.props.transferData.ownerTokenData.assetid} Token
          Amount: {this.props.transferData.ownerTokenData.quantity}
        </Text>
      </View>
    );

    if (!this.state.isNewReceiverInputVisible) selectedReceiver = null;
    if (!this.props.isOwnerAssetInfoVisible) selectedOwnerFrom = null;

    return (
      <View style={styles.container}>
        <View style={styles.senderPicker}>
          <RNPickerSelect
            placeholder={placeholderforSender}
            placeholderTextColor="#2699FB"
            items={this.props.allOwners.map(owner => {
              return { ...owner, ...{ color: "#2699FB" } };
            })}
            onValueChange={this.handleSelectionFrom}
          />
        </View>
        {selectedOwnerFrom}
        <View style={styles.receiverPicker}>
          <RNPickerSelect
            placeholder={placeholderforReceiver}
            placeholderTextColor="#2699FB"
            items={this.props.receiverList.map(asset => {
              return {
                label: asset[0],
                value: asset[0],
                ...{ color: "#2699FB" }
              };
            })}
            onValueChange={this.handleReceiverID}
          />
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          placeholder="Token Amount"
          placeholderTextColor="#2699FB"
          autoCapitalize="none"
          onChangeText={this.handleNumberofToken}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleTransferModal}
        >
          <Text style={styles.submitButtonText}> Make Transfer </Text>
        </TouchableOpacity>
        <TransferModal
          ownerAssetId={this.props.transferData.ownerTokenData.assetid}
          navigator={this.props.navigator}
          handleTransferModal={this.handleTransferModal}
          isVisible={this.state.modalVisible}
          transferInfoModelVisible={this.state.transferInfoModelVisible}
          setSubModalVisible={this.setSubModalVisible}
          transferData={this.props.transferData}
        />
        <AddNewOwnerModal
          isModalVisible={this.state.addNewOwnerModalVisible}
          onNewOwnerAdded={this.onNewOwnerAdded}
          handleNewReceiver={this.handleNewReceiver}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 50,
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
  },
  touchableText: {
    color: "white",
    fontSize: 16,
    marginLeft: 110,
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
    borderRadius: 4
  },
  receiverPicker: {
    margin: 15,
    height: 50,
    borderColor: "#BCE0FD",
    borderWidth: 1,
    justifyContent: "center"
  },
  senderPicker: {
    margin: 15,
    height: 50,
    borderColor: "#BCE0FD",
    borderWidth: 1,
    justifyContent: "center"
  }
});

mapStateToProps = state => {
  const { allOwners } = state.owner_tx_history;
  return {
    ...state.transfer_data,
    allOwners
  };
};

mapDispatchToProps = dispatch => {
  return {
    getOwners: assetID => getOwners(assetID)(dispatch),
    getOwnership: ownerID => getOwnership(ownerID)(dispatch),
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    handleReceiverId: receiverID => handleReceiverId(receiverID)(dispatch),
    handleNumberofToken: tokenAmount =>
      handleNumberofToken(tokenAmount)(dispatch),
    handleTransferSubmit: transferData =>
      handleTransferSubmit(transferData)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferScreen);

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CreateOwnershipModal from "../Modals/CreateOwnership";
import AddNewOwnerModal from "../../components/TransferModal/AddNewOwnerModal";
import { connect } from "react-redux";
import {
  handleOwnerID,
  setSubModalVisible,
  handleNewReceiver,
  onNewOwnerAdded,
  handleModal,
  handleNumberofToken,
  handleNewAssetID,
  handleAssetID,
  fillAssetSelection
} from "../../store/actions/ownershipCreation";

class OwnershipScreen extends React.Component {
  componentDidMount() {
    this.props.fillAssetSelection();
  }

  handleOwnerID = data => {
    this.props.handleOwnerID(data);
  };

  setSubModalVisible = () => {
    this.props.setSubModalVisible(this.props.owner);
    this.props.navigator.switchToTab({
      tabIndex: 0
    });
  };

  handleAssetID = data => {
    this.props.handleAssetID(data);
  };

  handleNewAssetID = data => {
    this.props.handleNewAssetID(data);
  };

  handleNumberofToken = data => {
    this.props.handleNumberofToken(data);
  };

  handleModal = () => {
    this.props.handleModal();
  };

  onNewOwnerAdded = () => {
    this.props.onNewOwnerAdded();
  };
  handleNewReceiver = newAssetID => {
    this.props.handleNewReceiver(newAssetID);
  };

  render() {
    const placeholder = {
      label: "Select an Asset",
      value: null,
      color: "#2699FB"
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>OWNER ID</Text>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter an Owner ID"
          placeholderTextColor="#2699FB"
          autoCapitalize="none"
          onChangeText={this.handleOwnerID}
        />

        <Text style={styles.header}>ASSET ID</Text>

        <View
          style={{
            margin: 15,
            height: 40,
            borderColor: "#BCE0FD",
            borderWidth: 1,
            justifyContent: "center"
          }}
        >
          <RNPickerSelect
            placeholder={placeholder}
            placeholderTextColor="#2699FB"
            items={this.props.receiverids}
            onValueChange={this.handleAssetID}
          />
        </View>

        <Text style={styles.header}>NUMBER OF TOKEN</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          placeholder="Enter Number of Token"
          placeholderTextColor="#2699FB"
          autoCapitalize="none"
          onChangeText={this.handleNumberofToken}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleModal}
        >
          <Text style={styles.submitButtonText}> Create </Text>
        </TouchableOpacity>
        <CreateOwnershipModal
          modalVisible={this.props.modalVisible}
          handleOwnershipModal={this.handleModal}
          OwnerID={this.props.owner.owner_id}
          AssetID={this.props.owner.asset_id}
          NumberofToken={this.props.owner.ntokens}
          navigator={this.props.navigator}
          createdOwnerInfoModelVisible={this.props.createdOwnerInfoModelVisible}
          setSubModalVisible={this.setSubModalVisible}
        />
        <AddNewOwnerModal
          isModalVisible={this.props.addNewOwnerModalVisible}
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
  },
  header: {
    marginLeft: 15,
    marginRight: 15,
    //marginTop: 10,
    marginBottom: 1,
    fontSize: 14,
    color: "#2699FB"
    //fontWeight: "bold"
  }
});

const mapStatetoProps = state => {
  const { allAssets } = state.asset_tx_history;
  return { ...state.owner_creation, allAssets };
};
const mapDispatchtoProps = dispatch => {
  return {
    handleOwnerID: data => handleOwnerID(data)(dispatch),
    setSubModalVisible: owner => setSubModalVisible(owner)(dispatch),
    handleNewReceiver: data => handleNewReceiver(data)(dispatch),
    onNewOwnerAdded: () => onNewOwnerAdded()(dispatch),
    handleModal: () => handleModal()(dispatch),
    handleNumberofToken: data => handleNumberofToken(data)(dispatch),
    handleNewAssetID: data => handleNewAssetID(data)(dispatch),
    handleAssetID: data => handleAssetID(data)(dispatch),
    fillAssetSelection: () => fillAssetSelection()(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(OwnershipScreen);

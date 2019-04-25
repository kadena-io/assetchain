import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import OwnerHistoryListItem from "../../components/OwnerHistoryListItem/OwnerHistoryListItem";
import HistoryScreenHeader from "../../components/HistoryScreenHeader/HistoryScreenHeader";
import { connect } from "react-redux";
import { getOwnerTxHistory } from "../../store/actions/ownerTxHistory";
const items = [1, 2, 3, 4, 5, 6, 100];

class OwnerTxHistoryScreen extends Component {
  componentDidMount() {
    this.props.getOwnerTxHistory(this.props.ownerTxHistory.selectedOwner);
  }
  render() {
    return (
      <View>
        <HistoryScreenHeader
          navigator={this.props.navigator}
          sortButtonRender={true}
          headerText={
            "2 Results For " + this.props.ownerTxHistory.selectedOwner
          }
        />

        <View style={styles.itemsContainer}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.assetText}>
              {this.props.ownerTxHistory.txData[0]
                ? this.props.ownerTxHistory.txData[0].asset_id
                : "No Asset"}
            </Text>
          </View>
          <ScrollView>
            {this.props.ownerTxHistory.txData.map((item, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <OwnerHistoryListItem itemNumber={index} listData={item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultText: {
    fontSize: 22,
    marginLeft: 50,
    marginRight: 40,
    color: "#2699FB",
    fontWeight: "bold"
  },
  line: {
    borderBottomColor: "#BCE0FD",
    borderBottomWidth: 1,
    marginTop: 10
  },
  itemsContainer: { marginTop: 36, marginBottom: 299 },
  assetText: { color: "#2699FB", fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", marginTop: 23 }
});

const mapStatetoProps = state => {
  const { ownerTxHistory } = state.owner_tx_history;
  return { ownerTxHistory };
};
const mapDispatchtoProps = dispatch => {
  return {
    getOwnerTxHistory: ownerID => getOwnerTxHistory(ownerID)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(OwnerTxHistoryScreen);

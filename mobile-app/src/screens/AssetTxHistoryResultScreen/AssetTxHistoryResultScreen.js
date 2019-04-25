import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HistoryListItem from "../../components/HistoryListItem/HistoryListItem";
import HistoryScreenHeader from "../../components/HistoryScreenHeader/HistoryScreenHeader";
import { connect } from "react-redux";
import { getAssetTxHistory } from "../../store/actions/assetTxHistory";
const items = [1, 2, 3, 4, 5, 6, 7];

class AssetTxHistoryResultScreen extends Component {
  componentDidMount() {
    this.props.getAssetTxHistory(this.props.assetTxHistory.selectedAsset);
  }
  render() {
    return (
      <View>
        <HistoryScreenHeader
          navigator={this.props.navigator}
          sortButtonRender={true}
          headerText={this.props.assetTxHistory.selectedAsset + " Tx History"}
        />
        <View style={styles.itemsContainer}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.assetText}>
              {this.props.assetTxHistory.txData.length
                ? this.props.assetTxHistory.asset_id
                : "No Transaction"}
            </Text>
          </View>
          <ScrollView>
            {this.props.assetTxHistory.txData.map((item, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <HistoryListItem itemNumber={index} listData={item} />
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
    marginLeft: 104,
    marginRight: 103,
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
  const { assetTxHistory } = state.asset_tx_history;
  return { assetTxHistory };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAssetTxHistory: assetID => getAssetTxHistory(assetID)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetTxHistoryResultScreen);

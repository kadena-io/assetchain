import React, { Component } from "react";
import { View } from "react-native";
import ListItem from "../../components/ListItem/ListItem";

class Reports extends Component {
  render() {
    return (
      <View>
        <ListItem
          itemName="Owner Transaction History"
          itemImage="ios-person"
          navigator={this.props.navigator}
          screen="DRET.OwnerSelectionScreen"
          screenHeader="Owner Transaction History"
        />
        <ListItem
          itemName="Asset Transaction History"
          itemImage="ios-swap"
          navigator={this.props.navigator}
          screen="DRET.AssetSelectionScreen"
          screenHeader="Asset Transaction History"
          nextScreen="DRET.AssetTxHistoryResultScreen"
        />
        <ListItem
          itemName="Asset Distribution"
          itemImage="ios-stats"
          navigator={this.props.navigator}
          screen="DRET.AssetDistributionScreen"
          screenHeader="Asset Distribution"
          nextScreen="DRET.AssetDistributionResultScreen"
        />
      </View>
    );
  }
}

export default Reports;

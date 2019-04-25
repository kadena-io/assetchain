import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AssetDistroPieChart from "../../components/AssetDistroPieChart/AssetDistroPieChart";
import HistoryScreenHeader from "../../components/HistoryScreenHeader/HistoryScreenHeader";
import ButtonWithNavigation from "../../components/ButtonWithNavigation/ButtonWithNavigation";
import { connect } from "react-redux";
import { getAssetDistribution } from "../../store/actions/assetDistribution";

class AssetDistributionResultScreen extends Component {
  componentDidMount() {
    this.props.getAssetDistribution(this.props.assetDistribution.selectedAsset);
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <View>
          <HistoryScreenHeader
            navigator={this.props.navigator}
            sortButtonRender={false}
            headerText={this.props.assetDistribution.selectedAsset + " Distro"}
          />
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.pageText}>Total Token Amount</Text>
            <Text style={styles.pageText2}>
              {this.props.assetDistribution.ownersData.length
                ? this.props.assetDistribution.ownersData.reduce((a, b) => {
                    return a + b[1];
                  }, 0)
                : "There is no owner"}
            </Text>
          </View>
          <AssetDistroPieChart
            listData={this.props.assetDistribution.ownersData}
          />
        </View>
        <View>
          <ButtonWithNavigation
            buttonTitle="See Asset Transaction History"
            navigator={this.props.navigator}
            screen="DRET.AssetTxHistoryResultScreen"
            screenHeader="Asset Transaction History"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageText: {
    color: "#2699FB",
    fontSize: 14,
    fontWeight: "bold"
  },
  pageText2: {
    color: "#2699FB",
    fontSize: 18,
    fontWeight: "bold"
  }
});

const mapStatetoProps = state => {
  const { assetDistribution } = state.asset_distribution;
  return { assetDistribution };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAssetDistribution: assetID => getAssetDistribution(assetID)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetDistributionResultScreen);

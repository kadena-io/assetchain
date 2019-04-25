import React, { Component } from "react";
import ReportScreen from "../../components/ReportScreen/ReportScreen";
import { connect } from "react-redux";
import {
  getAllAssets,
  handleAssetTxHistoryInputChange
} from "../../store/actions/assetTxHistory";

class AssetSelectionScreen extends Component {
  componentDidMount() {
    this.props.getAllAssets();
  }

  handleOnChange = event => {
    this.props.handleInputChange(event);
  };

  render() {
    return (
      <ReportScreen
        description=" Hi! My name is John, I’m a creative geek from San Francisco, CA. I enjoy creating eye candy solutions for web and mobile apps."
        buttonTitle="Review History Data"
        screen="DRET.AssetTxHistoryResultScreen"
        screenHeader="Asset Transaction History"
        navigator={this.props.navigator}
        listItems={this.props.allAssets}
        onSelectItem={this.handleOnChange}
      />
    );
  }
}

const mapStatetoProps = state => {
  return state.asset_tx_history;
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllAssets: () => getAllAssets()(dispatch),
    handleInputChange: event => handleAssetTxHistoryInputChange(event)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetSelectionScreen);

import React, { Component } from "react";
import ReportScreen from "../../components/ReportScreen/ReportScreen";
import { connect } from "react-redux";
import {
  getAllAssets,
  handleAssetDistInputChange
} from "../../store/actions/assetDistribution";

class AssetDistributionScreen extends Component {

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
        screen="DRET.AssetDistributionResultScreen"
        screenHeader="Asset Distribution"
        navigator={this.props.navigator}
        listItems={this.props.allAssets}
        onSelectItem={this.handleOnChange}
      />
    );
  }
}


const mapStatetoProps = state => {
  const { allAssets } = state.asset_distribution;
  return { allAssets };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllAssets: () => getAllAssets()(dispatch),
    handleInputChange: event => handleAssetDistInputChange(event)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetDistributionScreen);

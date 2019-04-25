import React, { Component } from "react";
import ReportScreen from "../../components/ReportScreen/ReportScreen";
import { connect } from "react-redux";
import {
  getAllOwnerships,
  handleOwnerTxHistoryInputChange
} from "../../store/actions/ownerTxHistory";

class OwnerSelectionScreen extends Component {
  componentDidMount() {
    this.props.getAllOwnerships();
  }

  handleOnChange = event => {
    this.props.handleInputChange(event);
  };

  render() {
    return (
      <ReportScreen
        description=" Hi! My name is John, I’m a creative geek from San Francisco, CA. I enjoy creating eye candy solutions for web and mobile apps."
        buttonTitle="Review History Data"
        screen="DRET.OwnerTxHistoryScreen"
        screenHeader="Owner Transaction History"
        navigator={this.props.navigator}
        listItems={this.props.allOwners}
        onSelectItem={this.handleOnChange}
      />
    );
  }
}

const mapStatetoProps = state => {
  const { allOwners } = state.owner_tx_history;
  return { allOwners };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    handleInputChange: event => handleOwnerTxHistoryInputChange(event)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(OwnerSelectionScreen);

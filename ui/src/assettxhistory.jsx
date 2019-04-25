import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import AssetTxHistoryTable from "./assetxhistorytable";
import { connect } from "react-redux";
import {
  getAllAssets,
  getAssetTxHistory,
  handleAssetTxHistoryInputChange
} from "./ActionCreators/actions";

class AssetTxHistory extends Component {
  componentDidMount() {
    this.props.getAllAssets();
  }

  getAssetTxHistory = e => {
    e.preventDefault();
    this.props.getAssetTxHistory(this.props.assetTxHistory.selectedAsset);
  };

  handleOnChange = event => {
    this.props.handleInputChange(event);
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="mt-5">
            <h1>Asset Transaction History</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="Assetid">Asset ID</Label>
                <Input
                  type="select"
                  ref="asset"
                  value={this.props.assetTxHistory.selectedAsset}
                  onChange={this.handleOnChange}
                >
                  <option>Select Asset</option>
                  {this.props.allAssets.map((asset, index) => (
                    <option key={index}>{asset}</option>
                  ))}
                </Input>
              </FormGroup>

              <input
                type="submit"
                value="View Transactions"
                onClick={this.getAssetTxHistory}
                className="btn btn-success float-right"
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <AssetTxHistoryTable />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { allAssets, assetTxHistory } = state;
  return { allAssets, assetTxHistory };
};

const mapDispatchtoProps = dispatch => {
  return {
    getAllAssets: () => getAllAssets()(dispatch),
    getAssetTxHistory: assetID => getAssetTxHistory(assetID)(dispatch),
    handleInputChange: event => handleAssetTxHistoryInputChange(event)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetTxHistory);

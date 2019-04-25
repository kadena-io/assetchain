import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import {
  getAllAssets,
  geAssetDistro,
  handleAssetDistroInputChange
} from "./ActionCreators/actions";

class AssetDistribution extends Component {
  componentDidMount() {
    this.props.getAllAssets();
  }

  handleOnChange = event => {
    this.props.handleInputChange(event);
  };

  geAssetDistro = e => {
    e.preventDefault();
    this.props.geAssetDistro(this.props.assetDistro.selectedAsset);
  };

  render() {
    let chartVisibility = { visibility: "hidden" };
    let totalTokenNumber = 0;

    if (this.props.assetDistro.distroData.length > 0) {
      chartVisibility = { visibility: "visible" };

      this.props.assetDistro.distroData.map(
        element => (totalTokenNumber += element[1])
      );
    }

    return (
      <React.Fragment>
        <Row>
          <Col className="mt-5">
            <h1>Asset Distribution</h1>
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
                  value={this.props.assetDistro.selectedAsset}
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
                value="Show Chart"
                onClick={this.geAssetDistro}
                className="btn btn-success float-right"
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={chartVisibility}>
            <span>
              Total Token:
              <span class="font-weight-bold"> {totalTokenNumber}</span>
            </span>
            <div id="assetChart">
              <Chart
                className="mt-4"
                width={"700px"}
                height={"400px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Asset Distribution", "Owners"],
                  ...this.props.assetDistro.distroData
                ]}
                options={{
                  title: ""
                }}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { assetDistro, allAssets } = state;
  return { assetDistro, allAssets };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllAssets: () => getAllAssets()(dispatch),
    handleInputChange: event => handleAssetDistroInputChange(event)(dispatch),
    geAssetDistro: assetID => geAssetDistro(assetID)(dispatch)
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AssetDistribution);

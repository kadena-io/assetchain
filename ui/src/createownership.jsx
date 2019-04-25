import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import {
  createOwnership,
  handleInputChange,
  ownershipToggleAlert,
  getAllOwnerships,
  getAllAssets
} from "./ActionCreators/actions";

class CreateOwnership extends Component {
  componentDidMount() {
    this.props.getAllOwnerships();
    this.props.getAllAssets();
  }

  createOwnership = event => {
    event.preventDefault();
    this.props.createOwnership(this.props.owner);
  };

  handleInputChange = event => {
    this.props.handleInputChange(event);
  };

  toggleAlert = () => {
    this.props.toggleAlert();
  };
  render() {
    let newAssetTextboxVisibility = { display: "None" };

    if (this.props.createOwnershipState.newAssetTextBoxVisibility)
      newAssetTextboxVisibility = { display: "block" };

    return (
      <>
        <Row>
          <Col className="mt-5">
            <h1>Create Ownership</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="Owenerid">Owner ID</Label>
                <Input
                  invalid={this.props.createOwnershipState.isExists}
                  valid={
                    !this.props.createOwnershipState.isExists &&
                    !this.props.createOwnershipState.init
                  }
                  id="ownerID"
                  placeholder="Ex: Ali1"
                  value={this.props.owner.owner_id}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="dboxAssetID">AssetID</Label>
                <Input
                  id="dboxAssetID"
                  type="select"
                  value={this.props.createOwnershipState.selectedAsset}
                  onChange={this.handleInputChange}
                  placeholder="Select Asset"
                >
                  <option>Select Asset</option>
                  <option>Add New Asset</option>
                  {this.props.allAssets.map((asset, index) => (
                    <option key={index}>{asset}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup style={newAssetTextboxVisibility}>
                <Input
                  id="assetID"
                  placeholder="Ex: REA1"
                  value={this.props.owner.asset_id}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Tokennumber">Number of Token</Label>
                <Input
                  id="tokenNumber"
                  placeholder="An Integer"
                  value={this.props.owner.ntokens}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <input
                type="submit"
                onClick={this.createOwnership}
                className="btn btn-success float-right"
                value="Create"
              />
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Alert
              color={
                this.props.createOwnershipState.response === "success"
                  ? "success"
                  : "danger"
              }
              isOpen={this.props.createOwnershipState.alertVisibility}
              toggle={this.props.toggleAlert}
            >
              {this.props.createOwnershipState.response === "success"
                ? "New ownership has been created!"
                : this.props.createOwnershipState.response}
            </Alert>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStatetoProps = state => {
  const {
    owner,
    newOwnershipCreated,
    allOwners,
    createOwnershipState,
    allAssets
  } = state;
  return {
    owner,
    newOwnershipCreated,
    allOwners,
    createOwnershipState,
    allAssets
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    createOwnership: owner => createOwnership(owner)(dispatch),
    handleInputChange: event => handleInputChange(event)(dispatch),
    toggleAlert: () => ownershipToggleAlert()(dispatch),
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    getAllAssets: () => getAllAssets()(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CreateOwnership);

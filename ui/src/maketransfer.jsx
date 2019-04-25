import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Col, Row, Alert } from "reactstrap";

import {
  handleTransferInputChange,
  getAllOwnerships,
  makeTransfer,
  transferToggleAlert,
  fillTransferToInputData
} from "./ActionCreators/actions";

class MakeTransfer extends Component {
  componentDidMount() {
    this.props.getAllOwnerships();
  }

  makeTransfer = e => {
    e.preventDefault();
    this.props.makeTransfer(this.props.makeTranferState.transferData);
  };

  handleInputChange = event => {
    this.props.handleInputChange(event);
    if (event.target.id === "from") this.fillToInputData(event.target.value);
  };

  fillToInputData = selectedOwner => {
    this.props.fillToInputData(selectedOwner);
  };

  toggleAlert = () => {
    this.props.toggleAlert();
  };

  render() {
    let newOwnershipTextBoxVisibility = { display: "None" };
    console.log(this.props.makeTranferState.selectedOwnerAsset);
    if (this.props.makeTranferState.newOwnershipTextBoxVisibility)
      newOwnershipTextBoxVisibility = { display: "block" };
    return (
      <>
        <Row>
          <Col className="mt-5">
            <h1>Make Transfer</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="Fromownerid">From</Label>
                <Input
                  id="from"
                  type="select"
                  value={this.props.makeTranferState.transferData.from}
                  onChange={this.handleInputChange}
                >
                  <option>Select Owner</option>
                  {this.props.allOwners.map((owner, index) => (
                    <option key={index}>{owner}</option>
                  ))}
                </Input>
                <div className="ml-1 mt-1">
                  <span>
                    {this.props.makeTranferState.selectedOwnerAsset.assetID}
                  </span>
                  <span>
                    {this.props.makeTranferState.selectedOwnerAsset.tokenNumber}
                  </span>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="dboxOwnerID">To</Label>
                <Input
                  id="dboxOwnerID"
                  type="select"
                  onChange={this.handleInputChange}
                  placeholder="Select Owner"
                >
                  <option>Select Owner</option>
                  <option>Add New Owner</option>
                  {this.props.makeTranferState.assetOwners.map(
                    (owner, index) => (
                      <option key={index}>{owner}</option>
                    )
                  )}
                </Input>
              </FormGroup>
              <FormGroup style={newOwnershipTextBoxVisibility}>
                <Input
                  placeholder="Ex: Zeynep2"
                  id="to"
                  value={this.props.makeTranferState.transferData.to}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Quantity">Quantity</Label>
                <Input
                  placeholder="An Integer"
                  id="quantity"
                  value={this.props.makeTranferState.transferData.quantity}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <input
                type="submit"
                value="Transfer Token(s)"
                className="btn btn-success float-right"
                onClick={this.makeTransfer}
              />
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Alert
              color={
                this.props.makeTranferState.response === "success"
                  ? "success"
                  : "danger"
              }
              isOpen={this.props.makeTranferState.alertVisibility}
              toggle={this.props.toggleAlert}
            >
              {this.props.makeTranferState.response === "success"
                ? "Transfer has been completed!"
                : this.props.makeTranferState.response}
            </Alert>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStatetoProps = state => {
  const {
    allOwners,
    transferCompleted,

    makeTranferState
  } = state;
  return { allOwners, transferCompleted, makeTranferState };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    handleInputChange: event => handleTransferInputChange(event)(dispatch),
    makeTransfer: transferData => makeTransfer(transferData)(dispatch),
    toggleAlert: () => transferToggleAlert()(dispatch),
    fillToInputData: owner => fillTransferToInputData(owner)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(MakeTransfer);

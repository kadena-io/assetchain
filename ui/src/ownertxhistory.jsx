import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import OwnerTxHistoryTable from "./ownerxhistorytable";
import { connect } from "react-redux";
import {
  getAllOwnerships,
  getOwnerTxHistory,
  handleOwnerTxHistoryInputChange
} from "./ActionCreators/actions";

class OwnerTxHistory extends Component {
  componentDidMount() {
    this.props.getAllOwnerships();
  }

  getOwnerTxHistory = e => {
    e.preventDefault();
    this.props.getOwnerTxHistory(this.props.ownerTxHistory.selectedOwner);
  };

  handleOnChange = event => {
    this.props.handleInputChange(event);
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="mt-5">
            <h1>Owner Transaction History</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="Owenerid">Owner ID</Label>
                <Input
                  type="select"
                  ref="owner"
                  value={this.props.ownerTxHistory.selectedOwner}
                  onChange={this.handleOnChange}
                >
                  <option>Select Owner</option>
                  {this.props.allOwners.map((owner, index) => (
                    <option key={index}>{owner}</option>
                  ))}
                </Input>
              </FormGroup>

              <input
                type="submit"
                value="View Transactions"
                onClick={this.getOwnerTxHistory}
                className="btn btn-success float-right"
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <OwnerTxHistoryTable />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { allOwners, ownerTxHistory } = state;
  return { allOwners, ownerTxHistory };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    getOwnerTxHistory: ownerID => getOwnerTxHistory(ownerID)(dispatch),
    handleInputChange: event => handleOwnerTxHistoryInputChange(event)(dispatch)
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(OwnerTxHistory);

import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  getAllOwnerships,
  checkOwnership,
  handleCheckOwnershipInputChange
} from "./ActionCreators/actions";

class CheckOwnership extends Component {
  componentDidMount() {
    this.props.getAllOwnerships();
  }

  checkOwnership = e => {
    e.preventDefault();
    this.props.checkOwnership(this.props.assetHolder);
  };

  handleChange = event => {
    this.props.handleInputChange(event);
  };

  render() {
    return (
      <>
        <Row>
          <Col className="mt-5">
            <h1>Check Ownership</h1>
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
                  value={this.props.assetHolder.selectedOwner}
                  onChange={this.handleChange}
                >
                  <option>Select Owner</option>
                  {this.props.allOwners.map((owner, index) => (
                    <option key={index}>{owner}</option>
                  ))}
                </Input>
              </FormGroup>

              <input
                type="submit"
                value=" Check Ownership"
                className="btn btn-success float-right"
                onClick={this.checkOwnership}
              />
            </Form>
          </Col>
        </Row>
        {this.props.assetHolder.assetid && (
          <Row>
            <Col className="mt-5">
              <Label>
                Asset ID: <strong>{this.props.assetHolder.assetid}</strong>
              </Label>
              <br />
              <Label>
                Quantity: <strong>{this.props.assetHolder.quantity}</strong>
              </Label>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

const mapStatetoProps = state => {
  const { assetHolder, allOwners } = state;
  return { assetHolder, allOwners };
};

const mapDispatchtoProps = dispatch => {
  return {
    getAllOwnerships: () => getAllOwnerships()(dispatch),
    checkOwnership: assetHolder => checkOwnership(assetHolder)(dispatch),
    handleInputChange: event => handleCheckOwnershipInputChange(event)(dispatch)
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CheckOwnership);

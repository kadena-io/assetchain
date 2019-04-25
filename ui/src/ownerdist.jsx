import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

class OwnerDistribution extends Component {
  state = {};
  render() {
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
                <Label for="Owenerid">Asset ID</Label>
                <Input type="select">
                  <option>Select Asset</option>
                </Input>
              </FormGroup>

              <Button className="btn btn-success float-right">
                Get Distribution
              </Button>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default OwnerDistribution;

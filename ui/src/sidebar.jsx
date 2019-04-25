import React, { Component } from "react";
import { UncontrolledCollapse, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ListGroup className="listItem">
          <ListGroupItem id="toggler1">Ownerships</ListGroupItem>
          <UncontrolledCollapse toggler="#toggler1">
            <ListGroup className="sub-1">
              <Link to="/create-ownership">
                <ListGroupItem> Create Ownership</ListGroupItem>
              </Link>
              <Link to="/check-ownership">
                <ListGroupItem> Check Ownership</ListGroupItem>
              </Link>
            </ListGroup>
          </UncontrolledCollapse>

          <ListGroupItem id="toggler2">Transfers</ListGroupItem>
          <UncontrolledCollapse toggler="#toggler2">
            <ListGroup className="sub-1">
              <Link to="/make-transfer">
                <ListGroupItem> Transfer</ListGroupItem>
              </Link>
              <Link to="/owner-tx-history">
                <ListGroupItem> Owner Transaction History</ListGroupItem>
              </Link>
              <Link to="/asset-tx-history">
                <ListGroupItem> Asset Transaction History</ListGroupItem>
              </Link>
            </ListGroup>
          </UncontrolledCollapse>

          <ListGroupItem id="toggler3">Reporting</ListGroupItem>
          <UncontrolledCollapse toggler="#toggler3">
            <ListGroup className="sub-1">
              <Link to="/asset-distro">
                <ListGroupItem> Asset Distribution </ListGroupItem>{" "}
              </Link>
            </ListGroup>
          </UncontrolledCollapse>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default SideBar;

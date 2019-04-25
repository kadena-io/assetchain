import React, { Component } from "react";
import { Table, Badge } from "reactstrap";
import { connect } from "react-redux";

class OwnerTxHistoryTable extends Component {
  txType = type => {
    if (type === "IN") {
      return <Badge color="success">IN</Badge>;
    } else {
      return <Badge color="danger">OUT</Badge>;
    }
  };
  render() {
    if (this.props.ownerTxHistory.txData.length > 0) {
      return (
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Total Tokens</th>
              <th>Asset</th>
              <th>Change</th>
              <th>Date</th>
              <th>Detail</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.ownerTxHistory.txData.map((transaction, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{transaction.tokens}</td>
                <td>{transaction.asset_id}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.nonce}</td>
                <td>
                  {transaction.to_ID === ""
                    ? "Ownership Created"
                    : transaction.to_ID ===
                      this.props.ownerTxHistory.selectedOwner
                    ? "from " + transaction.from_ID
                    : " to " + transaction.to_ID}
                </td>

                <td>{this.txType(transaction.tx_type)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return <div />;
    }
  }
}

const mapStatetoProps = state => {
  const { ownerTxHistory } = state;
  return { ownerTxHistory };
};
export default connect(mapStatetoProps)(OwnerTxHistoryTable);

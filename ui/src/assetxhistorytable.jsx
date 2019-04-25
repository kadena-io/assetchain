import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

class AssetTxHistoryTable extends Component {
  render() {
    if (this.props.assetTxHistory.txData.length > 0) {
      return (
        <>
          <Table className="mt-4" responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Quantity</th>
                <th>Detail</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.props.assetTxHistory.txData.map((assetTxHistory, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{assetTxHistory.quantity}</td>
                  <td>
                    {assetTxHistory.explain +
                      " " +
                      assetTxHistory.from_ID +
                      (assetTxHistory.to_ID === ""
                        ? " Ownership Created"
                        : " to " + assetTxHistory.to_ID)}
                  </td>
                  <td>{assetTxHistory.nonce}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    } else {
      return <div />;
    }
  }
}

const mapStatetoProps = state => {
  const { assetTxHistory } = state;
  return { assetTxHistory };
};
export default connect(mapStatetoProps)(AssetTxHistoryTable);

import React, { Component, Suspense, lazy } from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "./sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Reducers/rootReducer";

const CreateOwnership = lazy(() => import("./createownership"));
const CheckOwnership = lazy(() => import("./checkownership"));
const MakeTransfer = lazy(() => import("./maketransfer"));
const OwnerTxHistory = lazy(() => import("./ownertxhistory"));
const AssetTxHistory = lazy(() => import("./assettxhistory"));
const AssetDistribution = lazy(() => import("./assetdist"));

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <Row>
              <Col
                sm={{ size: "4" }}
                md="2"
                className="bg-dark text-white nav-side-menu"
              >
                <Row>
                  <Col className="brand">Asset Tokenization dApp</Col>
                </Row>
                <Row>
                  <Col className="p-0">
                    <Sidebar />
                  </Col>
                </Row>
              </Col>
              <Col sm={{ size: "auto", offset: 4 }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <div>
                        <h2 className="mt-5">Asset Tokenization dApp</h2>
                        <p className="mt-2">
                          Use Ownerships > Create Ownership link to get started.
                        </p>
                      </div>
                    )}
                  />
                  <Route path="/create-ownership" component={CreateOwnership} />
                  <Route path="/check-ownership" component={CheckOwnership} />
                  <Route path="/make-transfer" component={MakeTransfer} />
                  <Route path="/owner-tx-history" component={OwnerTxHistory} />
                  <Route path="/asset-tx-history" component={AssetTxHistory} />
                  <Route path="/asset-distro" component={AssetDistribution} />
                </Suspense>
              </Col>
            </Row>
          </>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

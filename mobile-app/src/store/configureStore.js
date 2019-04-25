import { createStore, combineReducers, compose } from "redux";

import { transferReducer } from "./reducers/transfer";
import {
  ownerTxReducer,
  assetTxReducer,
  assetDistReducer,
  createOwnershipReducer
} from "../store/reducers/root";

const rootReducer = combineReducers({
  owner_tx_history: ownerTxReducer,
  asset_tx_history: assetTxReducer,
  transfer_data: transferReducer,
  asset_distribution: assetDistReducer,
  owner_creation: createOwnershipReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;

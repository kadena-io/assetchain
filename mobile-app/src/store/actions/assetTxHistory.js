import axios from "axios";
import {
  GET_ALL_ASSETS,
  HANDLE_ASSET_TX_HISTORY_INPUT,
  ASSET_TX_HISTORY
} from "./actionsTypes";

export const getAllAssets = () => {
  return dispatch => {
    axios.get("http://192.168.2.32:5006/assets").then(res => {
      let test = [];
      res.data.forEach(function(entry) {
        test.push({ label: entry, value: entry });
      });
      dispatch({ type: GET_ALL_ASSETS, res: test });
    });
  };
};

export const handleAssetTxHistoryInputChange = event => {
  return dispatch => {
    dispatch({ type: HANDLE_ASSET_TX_HISTORY_INPUT, event });
  };
};

export const getAssetTxHistory = assetID => {
  return dispatch => {
    axios
      .get(`http://192.168.2.32:5006/transactions/asset/${assetID}`)
      .then(res => {
        dispatch({ type: ASSET_TX_HISTORY, res: res.data });
      });
  };
};

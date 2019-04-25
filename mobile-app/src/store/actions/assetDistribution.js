import axios from "axios";
import {
  GET_ALL_ASSETS,
  HANDLE_ASSET_DIST_INPUT,
  ASSET_DIST
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

export const handleAssetDistInputChange = event => {
  return dispatch => {
    dispatch({ type: HANDLE_ASSET_DIST_INPUT, event });
  };
};

export const getAssetDistribution = assetID => {
  return dispatch => {
    axios
      .get(`http://192.168.2.32:5006/ownership/owners/${assetID}`)
      .then(res => {
        dispatch({ type: ASSET_DIST, res: res.data });
      });
  };
};

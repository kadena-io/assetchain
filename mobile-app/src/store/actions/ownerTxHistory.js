import axios from "axios";
import {
  GET_ALL_OWNERSHIPS,
  HANDLE_OWNER_TX_HISTORY_INPUT,
  OWNER_TX_HISTORY
} from "./actionsTypes";

export const getAllOwnerships = () => {
  return dispatch => {
    axios.get("http://192.168.2.32:5006/ownership/all").then(res => {
      let test = [];
      res.data.forEach(function(entry) {
        test.push({ label: entry, value: entry });
      });

      dispatch({
        type: GET_ALL_OWNERSHIPS,
        res: test
      });
    });
  };
};

export const handleOwnerTxHistoryInputChange = event => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNER_TX_HISTORY_INPUT, event });
  };
};

export const getOwnerTxHistory = ownerID => {
  return dispatch => {
    axios
      .get(`http://192.168.2.32:5006/transactions/bykey/${ownerID}`)
      .then(res => {
        dispatch({ type: OWNER_TX_HISTORY, res: res.data });
      });
  };
};

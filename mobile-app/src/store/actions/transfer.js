import axios from "axios";
import {
  CHECK_OWNERSHIP,
  GET_ASSET_OWNERS,
  HANDLE_TRANSFER_RECEIVER,
  HANDLE_TOKEN_AMOUNT_INPUT,
  HANDLE_TRANSFER_SUBMIT
} from "./actionsTypes";

export const getOwnership = ownerID => {
  return dispatch => {
    axios
      .get(`http://192.168.2.32:5006/ownership/check/${ownerID}`)
      .then(res => {
        axios
          .get(`http://192.168.2.32:5006/ownership/owners/${res.data.assetid}`)
          .then(res2 => {
            res2.data.ownerTokenData = res.data;
            res2.data.receiverList = res2.data;
            res2.data.ownerID = ownerID;
            dispatch({ type: CHECK_OWNERSHIP, res: res2.data });
          });
      });
  };
};

export const getOwners = assetID => {
  return dispatch => {
    axios
      .get(`http://192.168.2.32:5006/ownership/owners/${assetID}`)
      .then(res => {
        dispatch({ type: GET_ASSET_OWNERS, res: res.data });
      });
  };
};

export const handleReceiverId = receiverID => {
  console.log("receiverid: " + receiverID);
  return dispatch => {
    dispatch({ type: HANDLE_TRANSFER_RECEIVER, receiverId: receiverID });
  };
};

export const handleNumberofToken = tokenAmount => {
  return dispatch => {
    dispatch({ type: HANDLE_TOKEN_AMOUNT_INPUT, tokenAmount: tokenAmount });
  };
};

export const handleTransferSubmit = transferData => {
  return dispatch => {
    axios.post("http://192.168.2.32:5006/transfer", transferData).then(res => {
      dispatch({ type: HANDLE_TRANSFER_SUBMIT, result: res.data });
    });
  };
};

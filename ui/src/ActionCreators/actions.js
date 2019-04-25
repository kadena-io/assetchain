import axios from "axios";

const getAllOwnerships = () => {
  return dispatch => {
    axios.get("/ownership/all").then(res => {
      dispatch({ type: "GET_ALL_OWNERSHIPS", res: res.data });
    });
  };
};

const checkOwnership = assetHolder => {
  return dispatch => {
    axios.get(`/ownership/check/${assetHolder.selectedOwner}`).then(res => {
      dispatch({ type: "CHECK_OWNERSHIP", res: res.data });
    });
  };
};

const createOwnership = owner => {
  return dispatch => {
    axios.post("/ownership/new", owner).then(res => {
      dispatch({ type: "CREATE_OWNER", res });
    });
  };
};

const handleInputChange = event => {
  return dispatch => {
    dispatch({ type: "CREATEOWNERSHIP_INPUT_ONCHANGE", event });
  };
};

const ownershipToggleAlert = () => {
  return dispatch => {
    dispatch({ type: "CREATEOWNERSHIP_TOGGLE_ALERT" });
  };
};

const transferToggleAlert = () => {
  return dispatch => {
    dispatch({ type: "TRANSFER_TOGGLE_ALERT" });
  };
};

const handleTransferInputChange = event => {
  return dispatch => {
    dispatch({ type: "HANDLE_TRANSFER_INPUT", event });
  };
};

const fillTransferToInputData = owner => {
  return dispatch => {
    axios.get(`/ownership/check/${owner}`).then(res => {
      axios.get(`/ownership/owners/${res.data.assetid}`).then(res2 => {
        res2.data.assetID = res.data.assetid;
        dispatch({ type: "FILL_TRANSFER_TOINPUT_DATA", res: res2.data });
      });
    });
  };
};

const handleCheckOwnershipInputChange = event => {
  return dispatch => {
    dispatch({ type: "HANDLE_CHECK_OWNER_INPUT", event });
  };
};

const handleOwnerTxHistoryInputChange = event => {
  return dispatch => {
    dispatch({ type: "HANDLE_OWNER_TX_HISTORY_INPUT", event });
  };
};

const makeTransfer = transferData => {
  return dispatch => {
    axios.post("/transfer", transferData).then(res => {
      dispatch({ type: "MAKE_TRANSFER", res: res });
    });
  };
};

const getOwnerTxHistory = ownerID => {
  return dispatch => {
    axios.get(`/transactions/bykey/${ownerID}`).then(res => {
      dispatch({ type: "OWNER_TX_HISTORY", res: res.data });
    });
  };
};

const getAllAssets = () => {
  return dispatch => {
    axios.get("/assets").then(res => {
      dispatch({ type: "GET_ALL_ASSETS", res: res.data });
    });
  };
};

const getAssetTxHistory = assetID => {
  return dispatch => {
    axios.get(`/transactions/asset/${assetID}`).then(res => {
      dispatch({ type: "ASSET_TX_HISTORY", res: res.data });
    });
  };
};

const handleAssetTxHistoryInputChange = event => {
  return dispatch => {
    dispatch({ type: "HANDLE_ASSET_TX_HISTORY", event });
  };
};

const geAssetDistro = assetID => {
  return dispatch => {
    axios.get(`/ownership/owners/${assetID}`).then(res => {
      dispatch({ type: "ASSET_DISTRIBUTION", res: res.data });
    });
  };
};

const handleAssetDistroInputChange = event => {
  return dispatch => {
    dispatch({ type: "HANDLE_ASSET_DISTRO", event });
  };
};

export {
  getAllOwnerships,
  checkOwnership,
  createOwnership,
  handleInputChange,
  ownershipToggleAlert,
  handleTransferInputChange,
  handleCheckOwnershipInputChange,
  makeTransfer,
  transferToggleAlert,
  getOwnerTxHistory,
  handleOwnerTxHistoryInputChange,
  getAllAssets,
  getAssetTxHistory,
  handleAssetTxHistoryInputChange,
  geAssetDistro,
  handleAssetDistroInputChange,
  fillTransferToInputData
};

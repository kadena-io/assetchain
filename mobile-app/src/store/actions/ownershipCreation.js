import axios from "axios";
import {
  CREATE_OWNER,
  CREATEOWNERSHIP_INPUT_ONCHANGE,
  HANDLE_OWNERSHIP_ASSETID_ONCHANGE,
  HANDLE_OWNERSHIPID_ONCHANGE,
  HANDLE_OWNERSHIP_CONFIRMATION_MODAL_VISIBLE,
  HANDLE_OWNERSHIP_CONFIRMATION_SUBMODAL_VISIBLE,
  HANDLE_OWNERSHIP_NEWASSETID,
  HANDLE_OWNERSHIP_TOKEN_NUMBER_INPUT_ONCHANGE,
  OWNERSHIP_ON_NEW_OWNER_ADDED,
  OWNERSHIP_HANDLE_NEW_ASSETID_ON_ADDED,
  OWNERSHIP_FILL_ASSET_SELECTION
} from "./actionsTypes";

export const fillAssetSelection = () => {
  return dispatch => {
    axios.get("http://192.168.2.32:5006/assets").then(res => {
      let test = [
        {
          label: "Add New Asset",
          value: "Add New Asset",
          color: "#2699FB"
        }
      ];
      res.data.forEach(function(entry) {
        test.push({ label: entry, value: entry, color: "#2699FB" });
      });
      dispatch({ type: OWNERSHIP_FILL_ASSET_SELECTION, test });
    });
  };
};

export const handleOwnerInputChange = data => {
  return dispatch => {
    dispatch({ type: CREATEOWNERSHIP_INPUT_ONCHANGE, data });
  };
};

export const createOwnership = owner => {
  return dispatch => {
    axios.post("http://192.168.2.32:5006/ownership/new", owner).then(res => {
      dispatch({ type: CREATE_OWNER, res });
    });
  };
};

export const handleOwnerID = data => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNERSHIPID_ONCHANGE, data });
  };
};

export const setSubModalVisible = owner => {
  return dispatch => {
    axios.post("http://192.168.2.32:5006/ownership/new", owner).then(res => {
      dispatch({ type: HANDLE_OWNERSHIP_CONFIRMATION_SUBMODAL_VISIBLE });
    });
  };
};

export const handleAssetID = data => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNERSHIP_ASSETID_ONCHANGE, data });
  };
};
export const handleNewAssetID = data => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNERSHIP_NEWASSETID, data });
  };
};
export const handleNumberofToken = data => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNERSHIP_TOKEN_NUMBER_INPUT_ONCHANGE, data });
  };
};
export const handleModal = () => {
  return dispatch => {
    dispatch({ type: HANDLE_OWNERSHIP_CONFIRMATION_MODAL_VISIBLE });
  };
};

export const onNewOwnerAdded = () => {
  return dispatch => {
    dispatch({ type: OWNERSHIP_ON_NEW_OWNER_ADDED });
  };
};
export const handleNewReceiver = data => {
  return dispatch => {
    dispatch({ type: OWNERSHIP_HANDLE_NEW_ASSETID_ON_ADDED, data });
  };
};

//getAssetDistribution için end point oluşturulması gerek

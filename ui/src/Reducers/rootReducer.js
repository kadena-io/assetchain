const initState = {
  owner: {
    owner_id: "",
    asset_id: "",
    ntokens: 0
  },
  createOwnershipState: {
    isExists: false,
    init: true,
    newAssetTextBoxVisibility: false,
    selectedAsset: "Select Asset",
    response: "init",
    alertVisibility: false
  },
  newOwnershipCreated: false,
  allOwners: [],
  allAssets: [],
  assetHolder: {
    selectedOwner: "",
    assetid: "",
    quantity: ""
  },
  ownerTxHistory: { selectedOwner: "", txData: [] },
  selectedAsset: "",
  assetTxHistory: { selectedOwner: "", txData: [] },
  assetDistro: { selectedOwner: "", distroData: [] },
  makeTranferState: {
    transferData: {
      from: "",
      to: "",
      quantity: ""
    },
    selectedOwner: "",
    newOwnershipTextBoxVisibility: false,
    selectedOwnerAsset: { tokenNumber: "", assetID: "" },
    assetOwners: [],
    alertVisibility: false,
    response: "init"
  }
};

const rootReducer = (state = initState, action) => {
  if (action.type === "CREATEOWNERSHIP_INPUT_ONCHANGE") {
    const owner = Object.assign({}, state.owner);
    const createOwnershipState = Object.assign({}, state.createOwnershipState);
    if (action.event.target.id === "ownerID") {
      owner.owner_id = action.event.target.value;
      createOwnershipState.init = false;
      if (state.allOwners.includes(owner.owner_id) || owner.owner_id === "")
        createOwnershipState.isExists = true;
      else createOwnershipState.isExists = false;
    } else if (action.event.target.id === "assetID") {
      owner.asset_id = action.event.target.value;
    } else if (action.event.target.id === "dboxAssetID") {
      if (action.event.target.value === "Add New Asset") {
        owner.asset_id = "";
        createOwnershipState.selectedAsset = "Add New Asset";
        createOwnershipState.newAssetTextBoxVisibility = true;
      } else {
        owner.asset_id = action.event.target.value;
        createOwnershipState.selectedAsset = action.event.target.value;
        createOwnershipState.newAssetTextBoxVisibility = false;
      }
    } else if (action.event.target.id === "tokenNumber") {
      owner.ntokens =
        Number.isInteger(Number.parseInt(action.event.target.value)) === true
          ? Number.parseInt(action.event.target.value)
          : 0;
    }
    return { ...state, owner, createOwnershipState };
  } else if (action.type === "CREATE_OWNER") {
    const owner = Object.assign({}, state.owner);
    const createOwnershipState = Object.assign({}, state.createOwnershipState);

    let response = action.res.data.result.indexOf("Failure");
    createOwnershipState.alertVisibility = true;
    if (response === -1) {
      owner.owner_id = "";
      owner.asset_id = "";
      owner.ntokens = 0;
      createOwnershipState.isExists = false;
      createOwnershipState.init = true;
      createOwnershipState.newAssetTextBoxVisibility = false;
      createOwnershipState.selectedAsset = "Select Asset";
      createOwnershipState.response = "success";
    } else {
      createOwnershipState.response = action.res.data.result.slice(
        action.res.data.result.indexOf("Failure"),
        action.res.data.result.length
      );
    }
    return {
      ...state,
      owner,
      createOwnershipState
    };
  } else if (action.type === "CREATEOWNERSHIP_TOGGLE_ALERT") {
    const createOwnershipState = Object.assign({}, state.createOwnershipState);
    createOwnershipState.alertVisibility = false;
    return {
      ...state,
      createOwnershipState
    };
  } else if (action.type === "HANDLE_OWNER_TX_HISTORY_INPUT") {
    const ownerTxHistory = Object.assign({}, state.ownerTxHistory);
    ownerTxHistory.selectedOwner = action.event.target.value;
    return {
      ...state,
      ownerTxHistory
    };
  } else if (action.type === "CREATEOWNERSHIP_DROPDOWN_ONCHANGE") {
    const createOwnershipState = Object.assign({}, state.createOwnershipState);
    createOwnershipState.isOpenDropDown = !createOwnershipState.isOpenDropDown;
    return {
      ...state,
      createOwnershipState
    };
  } else if (action.type === "TRANSFER_TOGGLE_ALERT") {
    let makeTranferState = Object.assign({}, state.makeTranferState);
    makeTranferState.alertVisibility = false;
    return {
      ...state,
      makeTranferState
    };
  } else if (action.type === "GET_ALL_OWNERSHIPS") {
    return {
      ...state,
      allOwners: action.res
    };
  } else if (action.type === "GET_ALL_ASSETS") {
    return {
      ...state,
      allAssets: action.res
    };
  } else if (action.type === "CHECK_OWNERSHIP") {
    let assetHolder = Object.assign({}, state.assetHolder);
    assetHolder = {
      selectedOwner: assetHolder.selectedOwner,
      ...action.res
    };
    return {
      ...state,
      assetHolder
    };
  } else if (action.type === "OWNER_TX_HISTORY") {
    const ownerTxHistory = Object.assign({}, state.ownerTxHistory);
    ownerTxHistory.txData = action.res;
    return {
      ...state,
      ownerTxHistory
    };
  } else if (action.type === "ASSET_TX_HISTORY") {
    const assetTxHistory = Object.assign({}, state.assetTxHistory);
    assetTxHistory.txData = action.res;
    return {
      ...state,
      assetTxHistory
    };
  } else if (action.type === "HANDLE_OWNERSHIP_TX_HISTORY") {
    return {
      ...state,
      selectedOwner: action.event.target.value
    };
  } else if (action.type === "HANDLE_ASSET_TX_HISTORY") {
    const assetTxHistory = Object.assign({}, state.assetTxHistory);
    assetTxHistory.selectedAsset = action.event.target.value;
    return {
      ...state,
      assetTxHistory
    };
  } else if (action.type === "ASSET_DISTRIBUTION") {
    const assetDistro = Object.assign({}, state.assetDistro);
    assetDistro.distroData = action.res;
    return {
      ...state,
      assetDistro
    };
  } else if (action.type === "HANDLE_ASSET_DISTRO") {
    const assetDistro = Object.assign({}, state.assetDistro);
    assetDistro.selectedAsset = action.event.target.value;
    return {
      ...state,
      assetDistro
    };
  } else if (action.type === "HANDLE_CHECK_OWNER_INPUT") {
    const assetHolder = Object.assign({}, state.assetHolder);
    assetHolder.selectedOwner = action.event.target.value;
    return {
      ...state,
      assetHolder
    };
  } else if (action.type === "HANDLE_TRANSFER_INPUT") {
    const makeTranferState = Object.assign({}, state.makeTranferState);
    if (action.event.target.id === "from") {
      makeTranferState.transferData.from = action.event.target.value;
      makeTranferState.selectedOwner = action.event.target.value;
    } else if (action.event.target.id === "dboxOwnerID") {
      if (action.event.target.value === "Add New Owner") {
        makeTranferState.transferData.to = "";
        makeTranferState.newOwnershipTextBoxVisibility = true;
      } else {
        makeTranferState.transferData.to = action.event.target.value;
        makeTranferState.selectedOwner = action.event.target.value;
        makeTranferState.newOwnershipTextBoxVisibility = false;
      }
    } else if (action.event.target.id === "to") {
      makeTranferState.transferData.to = action.event.target.value;
    } else if (action.event.target.id === "quantity") {
      makeTranferState.transferData.quantity =
        Number.isInteger(Number.parseInt(action.event.target.value)) === true
          ? Number.parseInt(action.event.target.value)
          : 0;
    }
    return { ...state, makeTranferState };
  } else if (action.type === "FILL_TRANSFER_TOINPUT_DATA") {
    const makeTranferState = Object.assign({}, state.makeTranferState);
    makeTranferState.selectedOwnerAsset.assetID = action.res.assetID + " ,";
    console.log(action.res);
    makeTranferState.assetOwners = action.res
      .filter(item => {
        if (item[0] !== makeTranferState.selectedOwner) return true;
        else makeTranferState.selectedOwnerAsset.tokenNumber = item[1];
      })
      .map(item => item[0]);

    return { ...state, makeTranferState };
  } else if (action.type === "MAKE_TRANSFER") {
    let makeTranferState = Object.assign({}, state.makeTranferState);

    let response = action.res.data.indexOf("Failure");
    makeTranferState.alertVisibility = true;

    if (response === -1) {
      makeTranferState = {
        transferData: {
          from: "",
          to: "",
          quantity: ""
        },
        selectedOwner: "",
        newOwnershipTextBoxVisibility: false,
        selectedOwnerAsset: { tokenNumber: "", assetID: "" },
        assetOwners: [],
        response: "success"
      };
    } else {
      makeTranferState.response = action.res.data.slice(
        action.res.data.indexOf("Failure"),
        action.res.data.length
      );
    }

    return {
      ...state,
      makeTranferState
    };
  }

  return state;
};

export default rootReducer;

import {
  GET_ALL_OWNERSHIPS,
  HANDLE_OWNER_TX_HISTORY_INPUT,
  OWNER_TX_HISTORY,
  GET_ALL_ASSETS,
  HANDLE_ASSET_TX_HISTORY_INPUT,
  ASSET_TX_HISTORY,
  HANDLE_ASSET_DIST_INPUT,
  ASSET_DIST,
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
} from "../actions/actionsTypes";

const ownerTxInitialState = {
  ownerTxHistory: { selectedOwner: "", txData: [] },
  allOwners: []
};
const assetTxInitialState = {
  assetTxHistory: { selectedAsset: "", txData: [] },
  allAssets: []
};
const assetDistInitialState = {
  assetDistribution: { selectedAsset: "", ownersData: [] },
  allAssets: []
};

const createOwnershipInitialState = {
  owner: {
    owner_id: "",
    asset_id: "",
    ntokens: 0
  },
  modalVisible: false,
  addNewOwnerModalVisible: false,
  receiverids: [
    {
      label: "Add New Asset",
      value: "Add New Asset",
      color: "#2699FB"
    },
    {
      label: "REA1",
      value: "REA1",
      color: "#2699FB"
    },
    {
      label: "REA2",
      value: "REA2",
      color: "#2699FB"
    },
    {
      label: "REA3",
      value: "REA3",
      color: "#2699FB"
    }
  ],
  selectedReceiverValue: "",
  createdOwnerInfoModelVisible: false,
  allAssets: []
};

export const ownerTxReducer = (state = ownerTxInitialState, action) => {
  switch (action.type) {
    case GET_ALL_OWNERSHIPS:
      return {
        ...state,
        allOwners: action.res
      };
    case HANDLE_OWNER_TX_HISTORY_INPUT:
      const ownerTxHistory = Object.assign({}, state.ownerTxHistory);
      ownerTxHistory.selectedOwner = action.event;
      return {
        ...state,
        ownerTxHistory
      };
    case OWNER_TX_HISTORY:
      const ownerTxHistory2 = Object.assign({}, state.ownerTxHistory);
      ownerTxHistory2.txData = action.res;
      return {
        ...state,
        ownerTxHistory: ownerTxHistory2
      };
    default:
      return state;
  }
};

export const assetTxReducer = (state = assetTxInitialState, action) => {
  switch (action.type) {
    case GET_ALL_ASSETS:
      return {
        ...state,
        allAssets: action.res
      };
    case HANDLE_ASSET_TX_HISTORY_INPUT:
      const assetTxHistory = Object.assign({}, state.assetTxHistory);
      assetTxHistory.selectedAsset = action.event;
      return {
        ...state,
        assetTxHistory
      };
    case ASSET_TX_HISTORY:
      const assetTxHistory2 = Object.assign({}, state.assetTxHistory);
      assetTxHistory2.txData = action.res;
      return {
        ...state,
        assetTxHistory: assetTxHistory2
      };
    default:
      return state;
  }
};

export const assetDistReducer = (state = assetDistInitialState, action) => {
  switch (action.type) {
    case GET_ALL_ASSETS:
      return {
        ...state,
        allAssets: action.res
      };
    case HANDLE_ASSET_DIST_INPUT:
      const assetDistribution = Object.assign({}, state.assetDistribution);
      assetDistribution.selectedAsset = action.event;
      return {
        ...state,
        assetDistribution
      };
    case ASSET_DIST:
      const assetDistribution2 = Object.assign({}, state.assetDistribution);
      assetDistribution2.ownersData = action.res;
      return {
        ...state,
        assetDistribution: assetDistribution2
      };
    default:
      return state;
  }
};

export const createOwnershipReducer = (
  state = createOwnershipInitialState,
  action
) => {
  const ownershipState = Object.assign({}, state);
  const assetDist = Object.assign({}, state.assetDist);
  switch (action.type) {
    case GET_ALL_ASSETS:
      return {
        ...state,
        allAssets: action.res
      };
    case CREATEOWNERSHIP_INPUT_ONCHANGE:
      ownershipState.owner.owner_id = action.data;
      return {
        ...ownershipState
      };
    case CREATE_OWNER:
      assetDist.selectedAsset = action.event;
      return {
        ...state,
        assetDist
      };
    case HANDLE_OWNERSHIP_ASSETID_ONCHANGE:
      if (action.data === "Add New Asset")
        ownershipState.addNewOwnerModalVisible = !ownershipState.addNewOwnerModalVisible;
      ownershipState.owner.asset_id = action.data;
      return {
        ...ownershipState
      };
    case HANDLE_OWNERSHIP_CONFIRMATION_MODAL_VISIBLE:
      ownershipState.modalVisible = !ownershipState.modalVisible;
      return {
        ...ownershipState
      };
    case HANDLE_OWNERSHIP_CONFIRMATION_SUBMODAL_VISIBLE:
      ownershipState.createdOwnerInfoModelVisible = !ownershipState.createdOwnerInfoModelVisible;
      ownershipState.modalVisible = false;
      return {
        ...ownershipState
      };
    case HANDLE_OWNERSHIPID_ONCHANGE:
      ownershipState.owner.owner_id = action.data;
      return {
        ...ownershipState
      };
    case HANDLE_OWNERSHIP_NEWASSETID:
      ownershipState.owner.asset_id = action.data;
      return {
        ...ownershipState
      };
    case HANDLE_OWNERSHIP_TOKEN_NUMBER_INPUT_ONCHANGE:
      ownershipState.owner.ntokens = action.data;
      return {
        ...ownershipState
      };
    case OWNERSHIP_ON_NEW_OWNER_ADDED:
      ownershipState.addNewOwnerModalVisible = !ownershipState.addNewOwnerModalVisible;
      ownershipState.owner.asset_id = "Select an Asset";
      return {
        ...ownershipState
      };
    case OWNERSHIP_HANDLE_NEW_ASSETID_ON_ADDED:
      ownershipState.receiverids = [
        ...ownershipState.receiverids,
        {
          label: action.data,
          value: action.data,
          color: "#2699FB"
        }
      ];
      ownershipState.owner.asset_id = action.data;
      return {
        ...ownershipState
      };
    case OWNERSHIP_FILL_ASSET_SELECTION:
      console.log("-------------------------------------");
      console.log(action.test);
      ownershipState.receiverids = action.test;
      return {
        ...ownershipState
      };
    default:
      return state;
  }
};

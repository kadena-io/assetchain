import {
  CHECK_OWNERSHIP,
  GET_ASSET_OWNERS,
  HANDLE_TRANSFER_RECEIVER,
  HANDLE_TOKEN_AMOUNT_INPUT,
  HANDLE_TRANSFER_SUBMIT
} from "../actions/actionsTypes";

const transferInitialState = {
  transferData: {
    ownerId: "",
    receiverId: "",
    tokenAmount: 0,
    ownerTokenData: { assetid: "", quantity: "" }
  },
  isOwnerAssetInfoVisible: false,
  receiverList: [],
  transferResult: ""
};

export const transferReducer = (state = transferInitialState, action) => {
  switch (action.type) {
    case CHECK_OWNERSHIP:
      const transferData = Object.assign({}, state.transferData);
      transferData.ownerTokenData = action.res.ownerTokenData;
      transferData.ownerId = action.res.ownerID;

      return {
        ...state,
        transferData: transferData,
        isOwnerAssetInfoVisible: true,
        receiverList: action.res.receiverList
      };
    case GET_ASSET_OWNERS:
      const receiverList = action.res;
      return {
        ...state,
        receiverList
      };
    case HANDLE_TRANSFER_RECEIVER:
      const transferData2 = Object.assign({}, state.transferData);
      transferData2.receiverId = action.receiverId;
      return {
        ...state,
        transferData: transferData2
      };
    case HANDLE_TOKEN_AMOUNT_INPUT:
      const transferData3 = Object.assign({}, state.transferData);
      transferData3.tokenAmount = action.tokenAmount;
      return {
        ...state,
        transferData: transferData3
      };
    case HANDLE_TRANSFER_SUBMIT:
      const result = action.result;
      return {
        ...state,
        transferResult: result
      };
    default:
      return state;
  }
};

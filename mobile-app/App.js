import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import TransferScreen from "./src/screens/Transfer/Transfer";
import OwnerTxHistoryScreen from "./src/screens/OwnerTxHistory/OwnerTxHistory";
import AssetTxHistoryResultScreen from "./src/screens/AssetTxHistoryResultScreen/AssetTxHistoryResultScreen";
import OwnershipScreen from "./src/screens/Ownership/Ownership";
import Reports from "./src/screens/Reports/Reports";
import AssetDistributionScreen from "./src/screens/AssetDistributionScreen/AssetDistributionScreen";
import AssetSelectionScreen from "./src/screens/AssetSelectionScreen/AssetSelectionScreen";
import OwnerSelectionScreen from "./src/screens/OwnerSelection/OwnerSelection";
import AssetDistributionResultScreen from "./src/screens/AssetDistributionResult/AssetDistributionResult";
import configureStore from "./src/store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
// Register screens
Navigation.registerComponent("DRET.AuthScreen", () => AuthScreen);

Navigation.registerComponent(
  "DRET.ProfileScreen",
  () => OwnershipScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.TransferScreen",
  () => TransferScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.AssetSelectionScreen",
  () => AssetSelectionScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.OwnerSelectionScreen",
  () => OwnerSelectionScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.AssetDistributionResultScreen",
  () => AssetDistributionResultScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.AssetDistributionScreen",
  () => AssetDistributionScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.AssetTxHistoryScreen",
  () => AssetTxHistoryScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.AssetTxHistoryResultScreen",
  () => AssetTxHistoryResultScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "DRET.OwnerTxHistoryScreen",
  () => OwnerTxHistoryScreen,
  store,
  Provider
);

Navigation.registerComponent("DRET.ReportsScreen", () => Reports);

Navigation.startSingleScreenApp({
  screen: {
    screen: "DRET.AuthScreen",
    title: "Login"
  }
});

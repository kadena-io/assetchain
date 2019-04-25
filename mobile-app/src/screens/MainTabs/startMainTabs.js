import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource("md-stats", 30),
    Icon.getImageSource("ios-swap", 30),
    Icon.getImageSource("md-list", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "DRET.TransferScreen",
          label: "Transfer",
          title: "Make Transfer",
          icon: sources[1]
        },
        {
          screen: "DRET.ReportsScreen",
          label: "Reports",
          title: "Choose a Report",
          icon: sources[0]
        },
        {
          screen: "DRET.ProfileScreen",
          label: "Profile",
          title: "Create Ownership",
          icon: sources[2]
        }
      ]
    });
  });
};

export default startTabs;

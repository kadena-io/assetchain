import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

class AssetDistroPieChart extends Component {
  render() {
    const chartData = this.props.listData
      .filter(item => item[1] > 0)
      .map(item => {
        return {
          name: item[0],
          population: item[1],
          color:
            "rgba(" +
            Math.floor(Math.random() * 255) +
            ", " +
            Math.floor(Math.random() * 255) +
            ", " +
            Math.floor(Math.random() * 255) +
            ", 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        };
      });
    return (
      <View>
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    );
  }
}
export default AssetDistroPieChart;

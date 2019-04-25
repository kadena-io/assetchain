import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class OwnerHistoryListItem extends Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemNumber}>
          <Text style={{ fontSize: 16, color: "#2699FB" }}>#</Text>
          <Text style={{ fontSize: 16, color: "#2699FB" }}>
            {this.props.itemNumber}
          </Text>
        </View>

        <View style={styles.itemDetail}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "33%" }}>
              <Text
                style={{ color: "#2699FB", fontWeight: "bold", marginTop: 10 }}
              >
                Total Tokens
              </Text>
              <Text style={{ color: "#2699FB", marginTop: 7.5 }}>
                {this.props.listData.tokens}
              </Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text
                style={{ color: "#2699FB", fontWeight: "bold", marginTop: 10 }}
              >
                Change
              </Text>
              <Text style={{ color: "#2699FB", marginTop: 7.5 }}>
                {this.props.listData.quantity}
              </Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text
                style={{ fontWeight: "bold", color: "#2699FB", marginTop: 10 }}
              >
                Date
              </Text>
              <Text style={{ color: "#2699FB", marginTop: 7.5 }}>
                {this.props.listData.nonce}
              </Text>
              <Text style={{ color: "#2699FB", marginTop: 7.5 }}>
                13:22:091232
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "33%" }}>
              <Text style={{ fontWeight: "bold", color: "#2699FB" }}>Type</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#7BE283",
                  alignItems: "center",
                  height: 22,
                  width: 27,
                  marginTop: 7.5
                }}
              >
                <Text style={{ color: "white" }}>IN</Text>
              </View>
            </View>
            <View style={{ width: "77%" }}>
              <Text style={{ fontWeight: "bold", color: "#2699FB" }}>
                Details
              </Text>
              <Text style={{ color: "#2699FB", marginTop: 7.5 }}>
                {this.props.listData.from_ID}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 160,
    width: 396,
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    flexDirection: "row",
    borderColor: "#BCE0FD"
  },
  itemNumber: {
    width: 30,
    height: "100%",
    backgroundColor: "#BCE0FD",
    alignItems: "center"
  },
  itemDetail: {
    margin: 5,
    width: 355
  }
});

export default OwnerHistoryListItem;

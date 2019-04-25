import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BorderBlueButton from "../../components/BorderBlueButton/BorderBlueButton";

export default class HistoryScreenHeader extends Component {
  render() {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.resultText}>{this.props.headerText}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <BorderBlueButton
                title="Search Again"
                navigator={this.props.navigator}
                buttonType={1}
              />
            </View>
            {this.props.sortButtonRender ? (
              <View style={{ marginLeft: 14 }}>
                <BorderBlueButton title="Sort By" buttonType={2} />
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultText: {
    fontSize: 22,
    color: "#2699FB",
    fontWeight: "bold"
  },
  line: {
    borderBottomColor: "#BCE0FD",
    borderBottomWidth: 1,
    marginTop: 10
  },
  itemsContainer: { marginTop: 36, marginBottom: 299 },
  assetText: { color: "#2699FB", fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 23
  }
});

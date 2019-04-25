import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ButtonWithNavigation from "../../components/ButtonWithNavigation/ButtonWithNavigation";

export default class ReportScreen extends Component {
  handleOnChange = event => {
    this.props.onSelectItem(event);
  };

  render() {
    const placeholder = {
      label: "Select Asset",
      value: null,
      color: "gray"
    };

    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.pageText}>{this.props.description}</Text>
          </View>

          <View style={styles.pickerContainer}>
            <RNPickerSelect
              style={{ color: "#2699FB" }}
              placeholder={placeholder}
              placeholderTextColor="gray"
              items={this.props.listItems}
              onValueChange={this.handleOnChange}
            />
          </View>
        </View>

        <ButtonWithNavigation
          buttonTitle={this.props.buttonTitle}
          navigator={this.props.navigator}
          screen={this.props.screen}
          screenHeader={this.props.screenHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageText: {
    color: "#2699FB",
    fontSize: 16
  },
  textContainer: {
    margin: 10,
    paddingLeft: 25,
    paddingRight: 25
  },
  pickerContainer: {
    marginTop: 33.5,

    marginLeft: 8,
    marginRight: 8,
    borderWidth: 0.7,
    justifyContent: "center",
    borderColor: "#2699FB",
    alignContent: "space-between"
  },
  touchableText: {
    color: "white",
    fontSize: 16,
    marginLeft: 110,
    fontWeight: "bold"
  },
  reviewButtonContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 260
  },
  touchable: {
    backgroundColor: "#2699FB",
    justifyContent: "center",
    borderColor: "#2699FB",
    borderRadius: 4
  }
});

import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from "react-native";
import styles from "../PostAd/styles";
import { Button } from "react-native-elements";
interface Props {
  navigation;
  route: any;
  data: any;
  hasShow: boolean;
}

class CreateAd extends React.Component<Props> { 
  initialState = {
    SellingPrice: 0,
    BaseValue: 0,
    IGST: 9,
    SGST: 9,
    Chess: 1,
    Total: 0,
    IGSTRate: 0,
    SGSTRate: 0,
    ChessRate: 0,
  };
  state = this.initialState;
  private hasShow = false;

  constructor(props) {
    super(props);
  }

  onPress = (value) => {
    //  this.setState({ value: value })
  };

  componentDidMount() {
    this.setState(this.initialState);
  }

  clear = () => {
    console.log("trigger Clear");
    let resetstate = { ...this.initialState }; // use spread operator to avoid mutation
    let stateObj = Object.assign({}, this.initialState);
    this.setState(stateObj);
    this.setState(resetstate);
    this.setState({ stateObj }, () => {
      console.log("call back", this.state.SellingPrice);
    });
    console.log(this.state.SellingPrice);
    this.forceUpdate();
    this.hasShow = false;
  };

  goNext = () => {
    if (this.state.SellingPrice == 0) {
      return;
    }
    if (!this.state.IGST) {
      this.state.IGST = 9;
    }
    if (!this.state.SGST) {
      this.state.SGST = 9;
    }
    let productPrice = this.state.SellingPrice;
    
    let baseIgst =
      productPrice - productPrice * (100 / (100 + this.state.IGST));
    let baseSgst =
      productPrice - productPrice * (100 / (100 + this.state.SGST)); 

    let iGstAmount = parseInt(baseIgst.toFixed(2));
    let sGstAmount = parseInt(baseSgst.toFixed(2));
    let totalGst = iGstAmount + sGstAmount;
    let baseAmt = productPrice - totalGst;
    let baseValue = parseInt(baseAmt.toFixed(2));
    // let baseValue = Math.round(baseAmt * 10000) / 10000;
    let actualAmt = this.state.SellingPrice - totalGst;
    let baseChess = 
    productPrice - productPrice * (100 / (100 + 1)); 

    let floodChess = Math.round(baseChess * 10000) / 10000;
    let calNetValue = actualAmt + totalGst+floodChess;
    let netValue= parseInt(calNetValue.toFixed(2));

    console.log("baseValue", baseValue);
    console.log("igst", iGstAmount);
    console.log("sgst", sGstAmount);
    console.log("without gst", actualAmt);
    console.log("floodChess", floodChess);
    console.log("totalGst", totalGst);
    console.log("total", netValue);

    this.setState({ BaseValue: baseValue });
    this.setState({ IGSTRate: iGstAmount });
    this.setState({ SGSTRate: sGstAmount });
    this.setState({ ChessRate: floodChess });
    this.setState({ Total: netValue });
    // this.setState({ Total: total});
    this.hasShow = true;
  };

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TouchableHighlight>
          <View style={{ padding: 40, backgroundColor: "#a5c2f2" }}>
            <View style={styles.detailsRow}>
              <Text
                style={{
                  textAlign: "left",
                  fontStyle: "normal",
                  fontWeight: "bold",
                }}
              >
                Net Value
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <TextInput
                keyboardType="numeric"
                placeholder="Selling Price"
                style={styles.loginFormTextInput}
                value={this.state.SellingPrice.toString()}
                onChangeText={(text) => {
                  this.setState({ SellingPrice: text });
                }}
              ></TextInput>
            </View>

            <View style={styles.detailsRow}>
              <Text
                style={{
                  textAlign: "left",
                  fontStyle: "normal",
                  fontWeight: "bold",
                }}
              >
                IGST %
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <TextInput
                keyboardType="numeric"
                placeholder="IGST 9 %"
                style={styles.loginFormTextInput}
                value={this.state.IGST.toString()}
                onChangeText={(text) => {
                  this.setState({ IGST: text });
                }}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text
                style={{
                  textAlign: "left",
                  fontStyle: "normal",
                  fontWeight: "bold",
                }}
              >
                SGST %
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <TextInput
                keyboardType="numeric"
                placeholder="SGST 9 %"
                style={styles.loginFormTextInput}
                value={this.state.SGST.toString()}
                onChangeText={(text) => {
                  this.setState({ SGST: text });
                }}
              ></TextInput>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  color: "#e91e63",
                }}
              >
                1 % Kerala Flood Chess will be applicable
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={styles.detailsRow}>
                <Button
                  // style={{ marginTop: 20, paddingLeft: 100 }}
                  title="Calculate"
                  buttonStyle={{
                    width: 110,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    backgroundColor: "#446ffc",
                  }}
                  onPress={() => {
                    this.goNext();
                  }}
                />
                <Button
                  title="Clear"
                  style={{ alignContent: "center" }}
                  buttonStyle={{
                    width: 110,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: 0,
                    backgroundColor: "#446ffc",
                  }}
                  onPress={() => {
                    this.clear();
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        {this.hasShow ? (
          <View
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              backgroundColor: "#a5c2f2",
            }}
          >
            <View
              style={{
                padding: 5,
              }}
            >
              <View style={styles.infoDetailsContainer}></View>

              <View style={styles.detailsRow}>
                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Base Value
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {this.state.BaseValue}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  IGST
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {this.state.IGSTRate}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  SGST
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {this.state.SGSTRate}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Flood Chess
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {this.state.ChessRate}
                </Text>
              </View>

              <View style={styles.detailsRow}>
                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Net Price
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {this.state.Total}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    );
  }
}

export default CreateAd;

// screens/AddUserScreen.js
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  ImageBackground, Image
} from "react-native";
import firebase from "../../services/connectionFirebase";

class AddItemScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("cafeteria");
    this.state = {
      cafes: "",
      descricao: "",
      preco: "",
      tamanho: "",
      isLoading: false,
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  storeUser() {
    if (this.state.name === "") {
      alert("Complete o campo!");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          cafes: this.state.cafes,
          descricao: this.state.descricao,
          preco: this.state.preco,
          tamanho: this.state.tamanho,
        })
        .then((res) => {
          this.setState({
            cafes: "",
            descricao: "",
            preco: "",
            tamanho: "",
            isLoading: false,
          });
          this.props.navigation.navigate("ListScreen");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#6f4f32" />
        </View>
      );
    }
    return (
      <ImageBackground
        style={styles.back}
        source={require("../../assets/img/cafe.png")}
        blurRadius={6}
      >
        <ScrollView style={styles.container}>
          <Image source={require('../../assets/img/logo.png')} style={{ width:340, height: 310, margin: 'auto'}}/>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"Item"}
              value={this.state.cafes}
              onChangeText={(val) => this.inputValueUpdate(val, "cafes")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={"Descrição"}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, "descricao")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"Valor"}
              value={this.state.preco}
              onChangeText={(val) => this.inputValueUpdate(val, "preco")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"Tamanho"}
              value={this.state.tamanho}
              onChangeText={(val) => this.inputValueUpdate(val, "tamanho")}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Adicionar"
              onPress={() => this.storeUser()}
              color="#6f4f32"
            />
          </View>
          
        </ScrollView>
        </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    marginTop:2,
    padding: 5,
    borderRadius: 7,
    height: 40,
    margin: 5,
    backgroundColor: "#fff",
  },
  back: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 915,
    width: 412,
  },
  button:{
    margin: 10,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AddItemScreen;

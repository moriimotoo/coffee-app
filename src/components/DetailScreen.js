// screens/UserDetailScreen.js
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../../services/connectionFirebase';
class DetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      cafes: '',
      descricao: '',
      preco: '',
      tamanho: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('cafeteria').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const coffee = res.data();
        this.setState({
          key: res.id,
          cafes: coffee.cafes,
          descricao: coffee.descricao,
          preco: coffee.preco,
          tamanho: coffee.tamanho,
          isLoading: false
        });
      } else {
        console.log("Produto não existe");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('cafeteria').doc(this.state.key);
    updateDBRef.set({
      cafes: this.state.cafes,
      descricao: this.state.descricao,
      preco: this.state.preco,
      tamanho: this.state.tamanho,
    }).then((docRef) => {
      this.setState({
        key: '',
        cafes: '',
        descricao: '',
        preco: '',
        tamanho: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ListScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  deleteUser() {
    const dbRef = firebase.firestore().collection('cafeteria').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removido do Banco de Dados')
          this.props.navigation.navigate('ListScreen');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Deletar produto',
      'Você tem certeza?',
      [
        {text: 'Sim', onPress: () => this.deleteUser()},
        {text: 'Não', onPress: () => console.log('Cancelado'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ImageBackground
        style={styles.back}
        source={require("../../assets/img/canto.png")}
        blurRadius={6}
      >
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput style={styles.texto}
              placeholder={'Item'}
              value={this.state.cafes}
              onChangeText={(val) => this.inputValueUpdate(val, 'cafes')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput style={styles.texto}
              multiline={true}
              numberOfLines={4}
              placeholder={'Descrição'}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, 'descricao')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput style={styles.texto}
              placeholder={'Preço'}
              value={this.state.preco}
              onChangeText={(val) => this.inputValueUpdate(val, 'preco')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput style={styles.texto}
              placeholder={'Tamanho'}
              value={this.state.tamanho}
              onChangeText={(val) => this.inputValueUpdate(val, 'tamanho')}
          />
        </View>
        <View style={styles.button}>
          <Button style={styles.texto}
            title='Update'
            onPress={() => this.updateUser()} 
            color="#91724a"
          />
          </View >
         <View style={styles.button}>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
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
    padding: 35
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
  texto:{
    textAlign: 'center',
    fontSize: 15
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 5,
    margin: 8
  }
})
export default DetailScreen;
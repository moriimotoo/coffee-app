// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import ListItem from './ListItem';
import firebase from '../../services/connectionFirebase';

class ListScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('cafeteria');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { cafes, descricao, preco, tamanho } = res.data();
      userArr.push({
        key: res.id,
        res,
        cafes,
        descricao,
        preco,
        tamanho,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#6f4f32"/>
        </View>
      )
    }    
    return (
      <ImageBackground
        style={styles.back}
        source={require("../../assets/img/salao.jpg")}
        blurRadius={6}
      >
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  title={item.cafes}
                  subtitle={item.descricao}
                  onPress={() => {
                    this.props.navigation.navigate('DetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
  },
  back: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 915,
    width: 412,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

  }
})
export default ListScreen;
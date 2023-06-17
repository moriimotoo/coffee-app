// App.js
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from './src/components/AddItemsScreen';
import ListScreen from './src/components/ListScreen';
import DetailScreen from './src/components/DetailScreen';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();
function MyStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#534741',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName='ListScreen'
      >
      <Stack.Screen 
        name="AddItemScreen" 
        component={AddItemScreen} 
        options={{ title: 'Adicionar Item' }}
      />
      <Stack.Screen 
        name="ListScreen" 
        component={ListScreen} 
        options={{ title: 'Listagem', headerLeft: (props)=><Button style={styles.botao} icon={{
          name: "add-circle",
          size: 30,
          color: "white"
        }} type='clear' onPress={()=>navigation.navigate('AddItemScreen')}/> }}
      />
      <Stack.Screen 
       name="DetailScreen" 
       component={DetailScreen} 
       options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  botao: {
   marginLeft: 10
  }
})
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


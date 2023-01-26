//Importing necesary dependencies
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importing App components
import Start from './components/Start';
import Chat from './components/Chat';

//Create the navigator between screens
// This will let use a single word to call the function rather than the funciton itself
const Stack = createStackNavigator();


//Component(s) section
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Start'>
          <Stack.Screen name = 'Start' component = {Start} />
          <Stack.Screen name = 'Chat' component = {Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}



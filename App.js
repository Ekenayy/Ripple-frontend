import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components";
import { NativeRouter, Route, Link } from "react-router-native";
import Navbar from './src/components/Navbar'
import { EdgeInsetsPropType } from 'react-native';
import Header from './src/components/Header'
import Welcome from './src/pages/WelcomePage'

function App() {


  const Body = styled.View`
    background-color: #5D5FEF;
    flex:1;
  `

  const Main = styled.ScrollView`
  `

  
  
  return (
    <NativeRouter> 
      <Body> 
        <Header></Header>
        <Main>
          <Welcome/>
        </Main>
        <Navbar></Navbar>
      </Body>
    </NativeRouter>
  );
}
export default App

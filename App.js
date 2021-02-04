import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components";
import { NativeRouter, Switch, Route, Link } from "react-router-native";
import Navbar from './src/components/Navbar'
import { EdgeInsetsPropType } from 'react-native';
import Header from './src/components/Header'
import Welcome from './src/pages/Welcome'
import Login from './src/pages/Login'
import ChallengeList from './src/pages/ChallengeList'
import Profile from './src/pages/Profile'
import SignUp from './src/pages/SignUp'
import ChallengeShow from './src/pages/ChallengeShow'
import CreateChallenge from './src/pages/CreateChallenge'

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
        <Header/>
        <Main>
          <Switch>
            <Route exact path='/' component={Welcome}/>
            <Route exact path='/user/:id' component={Profile}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/challenges' component={ChallengeList}/>
            <Route exact path='/challenges/:id' component={ChallengeShow}/>
            <Route exact path='/challenges/create' component={CreateChallenge}/>
          </Switch> 
        </Main>
        <Navbar/>
      </Body>
    </NativeRouter>
  );
}
export default App

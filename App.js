import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
import { BASE_URL } from '@env'

function App() {

  const [challenges, setChallenges] = useState([])
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    fetch(`${BASE_URL}/challenges`)
      .then(r => r.json())
      .then(data => setChallenges(data))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
  }, [])

  
  useEffect(() => {
    fetch(`${BASE_URL}/fake`)
      .then(r => r.json())
      .then(user => setCurrentUser(user))
  }, [])

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
            <Route exact path='/'>
              <Welcome/>
            </Route>
            <Route exact path='/user/:id'>
              <Profile setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </Route>
            <Route exact path='/login'>
              <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </Route>
            <Route exact path='/signup'>
              <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path='/challenges'>
              <ChallengeList challenges={challenges}/>
            </Route> 
            <Route exact path='/challenges/:id'>
              <ChallengeShow currentUser={currentUser}/>
            </Route> 
            <Route exact path='/challenges/create'>
              <CreateChallenge/>
            </Route> 
          </Switch> 
        </Main>
        <Navbar/>
      </Body>
    </NativeRouter>
  );
}
export default App

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

  const [currentUser, setCurrentUser] = useState(null)

  
  // useEffect(() => {

  //   if (currentUser) {
  //       fetch(`${BASE_URL}/users/${currentUser.id}`)
  //         .then(r => r.json())
  //         .then(thisUser => setCurrentUser(thisUser))
  //     }

  // }, [])

  
  // useEffect(() => {
  //   fetch(`${BASE_URL}/fake`)
  //     .then(r => r.json())
  //     .then(user => setCurrentUser(user))
  // }, [])

  const Body = styled.View`
    background-color: #5D5FEF;
    flex:1;
  `

  const Main = styled.ScrollView`
  `

  // console.log(currentUser)

  
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
              <ChallengeList />
            </Route> 
            <Route exact path='/challenges/:id'>
              <ChallengeShow setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </Route> 
            <Route exact path='/create_challenge'>
              <CreateChallenge currentUser={currentUser}/>
            </Route> 
          </Switch> 
        </Main>
        <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      </Body>
    </NativeRouter>
  );
}
export default App

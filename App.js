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
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { BASE_URL } from '@env'

function App() {

  const [currentUser, setCurrentUser] = useState(null)


  const Body = styled.View`
    flex:1;     
    background-color: #5D5FEF;
  `

  const Main = styled.ScrollView`
  `


  
  return (

      <NativeRouter>
        {/* <AnimatedLinearGradient customColors={presetColors.instagram} speed={4000}> */}
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
                <ChallengeList currentUser={currentUser} setCurrentUser={setCurrentUser}/>
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
        {/* </AnimatedLinearGradient>  */}
      </NativeRouter>
  );
}
export default App

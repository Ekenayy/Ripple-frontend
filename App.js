import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NativeRouter, Switch, Route } from "react-router-native";
import { useHistory } from "react-router-dom";
import Navbar from './src/components/Navbar'
import Header from './src/components/Header'
import Welcome from './src/pages/Welcome'
import Login from './src/pages/Login'
import ChallengeList from './src/pages/ChallengeList'
import Profile from './src/pages/Profile'
import SignUp from './src/pages/SignUp'
import ChallengeShow from './src/pages/ChallengeShow'
import CreateChallenge from './src/pages/CreateChallenge'
import Opening from './src/pages/Opening'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet} from 'react-native';


function App() {

  const [currentUser, setCurrentUser] = useState(null)

  let history = useHistory()


  const Body = styled.View`
    flex:1;     
    background-color: #5D5FEF;
  `

  const Main = styled.ScrollView`

  `

  const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 1200,
    }
  })
  // height: 1200,


  return (


      <NativeRouter>
        <Body> 
          <LinearGradient
          // Background Linear Gradient
          colors={['#5D5FEF', "#E379DF", "#FDB54A"]}
          style={styles.background}
            />
          <Header/>
          <Main>
            <Switch>
              <Route exact path='/'>
                <Opening currentUser={currentUser}/>
              </Route> 
              <Route exact path='/welcome'>
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
      </NativeRouter>
  );
}
export default App

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
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';




function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState("")

  let history = useHistory()

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

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

  const load = async () => {
    let thisToken = ''
      try {
          thisToken = await AsyncStorage.getItem('token') || 'none'  
          
          if (thisToken !== 'none') {
            setToken(thisToken)
          }
          // setToken(thisToken)
      } catch(e) {
        // read error
        console.log(e.message)
      }
      return thisToken
  }


  useEffect( () => {
    load()
  }, []) 

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
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
                <Opening font={Inter_900Black} currentUser={currentUser}/>
              </Route> 
              <Route exact path='/welcome'>
                <Welcome/>
              </Route> 
              <Route exact path='/user/:id'>
                <Profile setCurrentUser={setCurrentUser} currentUser={currentUser}/>
              </Route>
              <Route exact path='/login'>
                <Login token={token} setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
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
}
export default App

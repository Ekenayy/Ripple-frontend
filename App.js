import React, { useState, useEffect } from 'react';
import  styled, { ThemeProvider } from "styled-components";
import { NativeRouter, Switch, Route, Redirect } from "react-router-native";
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
import { useFonts, Quicksand_700Bold} from '@expo-google-fonts/quicksand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env'
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Native splash']);


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [dynoAwake, setDynoAwake] = useState(false)

  let history = useHistory()


  let [fontsLoaded] = useFonts({
    Quicksand_700Bold
  });

  const Body = styled.View`
    flex:1;     
    background-color: #5D5FEF;
  `

  const Main = styled.ScrollView`
  `

  useEffect(() => {
    if (!dynoAwake) {
      fetch(`${BASE_URL}/challenges`)
        .then(r => r.json())
        .then(data => {
          if (data) {
            setDynoAwake(true)
          }
        })
    }
  }, [dynoAwake])

  // const LoadingText = styled.Text`
  //   font-size: 12px;
  //   color: #F7F8F3;
  //   margin-left: 12px;
  // `

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
    if (dynoAwake){
      load()
    }
  }, [dynoAwake]) 

  useEffect( () => {
    if (token && !currentUser) {
      fetch(`${BASE_URL}/token_show`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }, 
      })
        .then(r => r.json())
        .then(user =>{
          setCurrentUser(user)
          setLoggedIn(true)
          // <Redirect to="/challenges" />
          // history.push('/challenges')
        })
    }
  }, [token])



  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
  return (
      <NativeRouter>
        <ThemeProvider theme={{fontFamily: 'Quicksand_700Bold'}}>
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
                  { loggedIn ? <Redirect to="/challenges" /> : <Opening currentUser={currentUser}/>}
                </Route> 
                <Route exact path='/welcome'>
                  <Welcome dynoAwake={dynoAwake} setDynoAwake={setDynoAwake} />
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
      </ThemeProvider>
      </NativeRouter>
    );
  }
}
export default App

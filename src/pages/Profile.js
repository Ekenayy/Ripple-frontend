import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BASE_URL } from '@env'
import UserChallengeItem from '../components/UserChallengeItem'
import {useParams, useHistory } from "react-router-dom";
import ChallengeItem from '../components/ChallengeItem'
import User from '../components/User'
import AsyncStorage from '@react-native-async-storage/async-storage';



function Profile ( {currentUser, setCurrentUser}) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [createdChall, setCreatedChall] = useState([])
    const [userChall, setUserChall] = useState([])
    const [selected, setSelected] = useState("")
    const [thisUser, setThisUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [token, setToken] = useState("")

    let params = useParams()
    let formId
    let userObj = {}

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

// If this user has just signed up the params id will be a number,
// If the user clicks the profile button on the nav, params will be NaN which is falsy
    
    if (parseInt(params.id)) {
      formId = parseInt(params.id)
    } else {
      formId = currentUser.id
    }
    
    useEffect( () => {
      const abortCtrl = new AbortController()
      const opts = {signal: abortCtrl.signal}

      fetch(`${BASE_URL}/users/${formId}}`, opts)
        .then(res => res.json())
        .then(fetchedUser => setThisUser(fetchedUser))
        .catch((err) => {
          if (err.name == 'AbortError') {
            console.log('request was cancelled')
          } else {
            console.log(err)
          }
        })

        return function cleanup() {
          abortCtrl.abort()
        }

    }, [formId])

      useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = {signal: abortCtrl.signal}

        fetch(`${BASE_URL}/my_user_challenges/${formId}`, opts)
                  .then(res => res.json())
                  .then(fetchedUserChall => {
                    if (fetchedUserChall.errors) {
                      console.log(fetchedUserChall.errors)
                    } else {
                      setUserChall(fetchedUserChall)
                    }                   
                  })
                  .catch((err) => {
                          if (err.name == 'AbortError') {
                            console.log('request was cancelled')
                          } else {
                            console.log(err)
                          }
                  })

                  return function cleanup() {
                    abortCtrl.abort()
                  }
      }, [formId])

      useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = {signal: abortCtrl.signal}

        fetch(`${BASE_URL}/created_challenges/${formId}`, opts)
          .then(res => res.json())
          .then(fetchedCreatedChallenge => {
            // console.log(fetchedCreatedChallenge)
            setCreatedChall(fetchedCreatedChallenge)
            setIsLoaded(true)
          })
          .catch((err) => {
            if (err.name == 'AbortError') {
              console.log('request was cancelled')
            } else {
              console.log(err)
            }
        })

        return function cleanup() {
          abortCtrl.abort()
        }

      }, [formId])

      const Container = styled.View`
        flex-direction: column;
        padding-bottom: 55px;
      `

      const Challenges = styled.View`
      `

      const Filters = styled.View`
        flex-direction: row;
        justifyContent: space-around;
      `

      const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 120px;
        height: 30px;
        margin: 12px;
        border-radius:20px;
        align-items: center
      `

      const Span = styled.Text`
      color: #F7F8F3
      font-size: 12px;
      align-self: center;
      padding-top: 5px;
      `

      const ChallengeView = styled.View`
        width: 100%
      `

      const CreatedChallengeView = styled.View`
        width: 100%
        flex-direction: row;
      `

      const Title = styled.Text`
        font-size: 18px;
        font-weight:500;
        color: #F7F8F3;
        font-weight: bold;
        align-self:center;
        margin-bottom: 5px;
        margin-top: 5px;
      `

      if (isLoaded) {

        const handleCreatedClick = () => {
          setSelected('created')
        }

        const createdChallengeList = createdChall.map(chall => {
            return <ChallengeItem key={chall.id} challenge={chall}/>
          })
        

        // I can handle this with a filter and ternary expression. 
        // Completed and uncompeted challenges are still just UserChallenges
        const userChallengeList = userChall.filter( uc => {
          if (selected == 'finished') {
            return uc.completed
          } else {
            return !uc.completed
          }
        })
          .map(uc => {
              return <UserChallengeItem setUserChallList={setUserChall} userChallList={userChall} thisUser={thisUser} currentUser={currentUser} key={uc.id} userChallenge={uc} challenge={uc.challenge}/>
          })

        return (
          <Container>
            <User currentUser={currentUser} thisUser={thisUser} setThisUser={setThisUser} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <Challenges>
              <Filters>
                <Button onPress={() => setSelected('created')}>
                  <Span>Created Challenges</Span>
                </Button>
                <Button onPress={() => setSelected('current')}>
                  <Span>Current Challenges</Span>
                </Button>
                <Button onPress={() => setSelected('finished')}>
                  <Span>Finished Challenges</Span>
                </Button>
              </Filters>
              {selected === 'created' ? 
              <ChallengeView>
                <Title>Created Challenges</Title>
                <CreatedChallengeView>
                  {createdChallengeList}
                </CreatedChallengeView>
              </ChallengeView> :
              <ChallengeView>
                <Title>Taken Challenges</Title> 
                {userChallengeList}
              </ChallengeView>
              }
            </Challenges>
        </Container>
        )
      }
      else {
        return(
          <Span>Loading...</Span>
        )
      }
    }
    
    export default Profile
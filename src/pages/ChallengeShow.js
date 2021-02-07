import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from "react-router-dom";
import YouTube from 'react-native-youtube'
import { BASE_URL } from '@env'


function ChallengeShow ( {currentUser }) {

  // AIzaSyDm0mYxB4CI2wZWva9b53HumoXnKvfeMMY
  let history = useHistory()
  let params = useParams()

  const [challenge, setChallenge] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userChallenge, setUserChallenge] = useState()

  let youtubeId

  useEffect(() => {
    fetch(`${BASE_URL}/challenges/${params.id}`)
          .then(res => res.json())
          .then(data => setChallenge(data))
          .then(() => {
            if (challenge) {
            setIsLoaded(true)
          }
          })
  }, [])
  

    const MainText = styled.Text`
      font-size: 12px;
      color: #F7F8F3;
      `

    const TestView = styled.View`
      padding: 12px;
    `

    const ImageView = styled.View`
      width:100%
      padding: 12px;
    `
    const ChallengeImage = styled.Image`
      width:100%;
      height:80px;
    `

    const Button = styled.TouchableOpacity`
      background: #03DAC5;
      width: 100px;
      margin: 12px;
      border-radius:20px;
    `

    const Span = styled.Text`
      color: #F7F8F3
      padding: 12px;
    `

    // Return statement and functions are wrapped in a conditional 
  if (challenge) {
    const url = challenge.video_url
    const lastPart = url.split("=")
    youtubeId = lastPart[1].split("&")[0]

    const allTasks = challenge.task_challenges.map(tc => {
      // debugger 
      return (
      <TestView >      
        <MainText>{tc.task.description}</MainText>
      </TestView>
      )
  })
  
  const handlePress = () => {
    // Make a post request to UserChallenge with challenge.id and user.id
    // Make userTaskChallenges that are clones of this challenges task challenges
    const formBody = {
      user_id: currentUser.id,
      challenge_id: params.id,
      completed: false
  }

    fetch(`${BASE_URL}/user_challenges`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formBody)
    })
      .then(res => res.json())
      .then(fetchedUserChallenge => {
        setUserChallenge(fetchedUserChallenge)
        createUTC(fetchedUserChallenge)
      })
  }

  const createUTC = (ucFromDb) => {
    console.log(ucFromDb)

    let task_challenges = ucFromDb.challenge.task_challenges
    task_challenges.forEach(tc => {

      let formBody = {
        user_challenge_id: ucFromDb.id,
        description: tc.task.description,
        completed: false
      }

      fetch(`${BASE_URL}/user_task_challenges`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formBody)
      })
        .then(res => res.json())
        .then(userTaskChallenge => console.log(userTaskChallenge))
    })

  }

  
        return (
        <>
          {/* <VideoView>
            <YouTube
              apiKey={"AIzaSyDm0mYxB4CI2wZWva9b53HumoXnKvfeMMY"}
              videoId={youtubeId}
              fullscreen={false}
            />
          </VideoView> */}
          <ImageView>          
            <ChallengeImage source={{uri: challenge.photo_url}}/>
          </ImageView>
          {allTasks}
          <Button onPress={handlePress}>
            <Span>Take this challenge</Span>
          </Button>
          {/* Conditionally rendering based off of custom serializer attribute */}
          {/* {currentUser.challenge_ids.includes(challenge.id) ? null : <Button onPress={handlePress}>
            <Span>Take this challenge</Span>
          </Button>} */}
        </>
        )
      }
      else {
        return <MainText>Loading...</MainText>
      }
  }
    
    export default ChallengeShow
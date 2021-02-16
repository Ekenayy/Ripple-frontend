import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import {useParams, useHistory } from "react-router-dom";
import YouTube from 'react-native-youtube'
import { BASE_URL } from '@env'
import { Link } from "react-router-native";
import ReviewItem from '../components/ReviewItem'
import ReviewForm from '../components/ReviewForm'


function ChallengeShow ( {currentUser, setCurrentUser}) {

  // AIzaSyDm0mYxB4CI2wZWva9b53HumoXnKvfeMMY
  let history = useHistory()
  let params = useParams()

  const [challenge, setChallenge] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userChallenge, setUserChallenge] = useState()
  const [clicked, setClicked] = useState(false)
  const [reviews, setReviews] = useState([])

  let youtubeId

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    fetch(`${BASE_URL}/challenges/${params.id}`, opts)
          .then(res => res.json())
          .then(data => setChallenge(data))
          .then(() => {
            if (challenge) {
            setIsLoaded(true)
          }
          })
          .catch((error) => {
            if (error.name == 'AbortError') {
              console.log('request was cancelled');
            }})
          

    return () => abortCtrl.abort()
  }, [])

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    if (challenge) {
       fetch(`${BASE_URL}/challenge_reviews/${challenge.id}`, opts)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch((error) => {
          if (error.name == 'AbortError') {
            console.log('request was cancelled');
          }})
    }
     

    
    return () => abortCtrl.abort()

  }, [challenge])


  
  // console.log(challenge)

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
      height:160px;
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

    const TextOpacity = styled.TouchableOpacity`
    `

    const ReviewsView = styled.View`
      flex-direction: block;
      width: 100%;
    `

    // Return statement and functions are wrapped in a conditional 
  if (challenge) {
    // const url = challenge.video_url
    // const lastPart = url.split("=")
    // youtubeId = lastPart[1].split("&")[0]

    

    const allTasks = challenge.task_challenges.map(tc => {
      // debugger 
      return (
      <TestView key={tc.id}>      
        <MainText>{tc.task.description}</MainText>
      </TestView>
      )
  })
  
  const handlePress = () => {
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
        setCurrentUser(fetchedUserChallenge.user)
      })

      setClicked(true)
  }

  const createUTC = (ucFromDb) => {

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
    })

  }


      const allReviews = reviews.map(review => {
        return <ReviewItem review={review} />
      })

      
    // const allReviews = reviews.map(review => {
    //   return <ReviewItem review={review} />
    // })


   

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
          <TestView>
            <TextOpacity onPress={() => history.push(`/user/${challenge.user.id}`)}> 
              <MainText>Created by:  {challenge.user.name}</MainText>          
            </TextOpacity>
            <MainText> {challenge.my_challenge_takers.length} people have taken this challenge </MainText>
          </TestView>            
          {allTasks}
          {/* Conditionally rendering based off of custom serializer attribute challenge_ids and reviewed_challenge_ids */}
          {currentUser.challenge_ids.includes(challenge.id) || clicked ? 
          null
          : 
          <Button onPress={handlePress}>
            <Span>Take this challenge</Span>
          </Button>}
          {currentUser.challenge_ids.includes(challenge.id) && !currentUser.reviewed_challenge_ids.includes(challenge.id) ? 
          <ReviewForm challenge={challenge} currentUser={currentUser} /> 
          :
          null}
          {reviews ? allReviews : null}
        </>
        )
      }
      else {
        return <MainText>Loading...</MainText>
      }
  }
    
    export default ChallengeShow
import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import {useParams, useHistory } from "react-router-dom";
import YouTube from 'react-native-youtube'
import { BASE_URL } from '@env'
import { Link } from "react-router-native";
import ReviewItem from '../components/ReviewItem'
import ReviewForm from '../components/ReviewForm'
import { Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import TaskItem from '../components/TaskItem'




function ChallengeShow ( {currentUser, setCurrentUser}) {

  let history = useHistory()
  let params = useParams()

  const [challenge, setChallenge] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userChallenge, setUserChallenge] = useState()
  const [clicked, setClicked] = useState(false)
  const [reviews, setReviews] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  console.log(params.id)
  // let youtubeId
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

      fetch(`${BASE_URL}/challenge_reviews/${params.id}`, opts)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch((error) => {
          if (error.name == 'AbortError') {
            console.log('request was cancelled');
          }})
  
    return () => abortCtrl.abort()

  }, [challenge])

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
      padding-bottom: 0px;
    `
    const ChallengeImage = styled.Image`
      width:100%;
      height:160px;
    `

    const Button = styled.TouchableOpacity`
      background: #03DAC5;
      width: 150px;
      margin: 12px;
      border-radius:20px;
      align-self:center
    `
    const ReviewButton = styled(Button)`
    `

    const Span = styled.Text`
      color: #F7F8F3
      padding: 12px;
      font-weight: bold;
      align-self: center;
    `

    const TextOpacity = styled.TouchableOpacity`
    `


    const Title = styled.Text`
      color: #F7F8F3;
      font-size: 24px;
      font-weight: bold;
      align-self: center;
      margin-bottom: 5px;
      margin-top: 5px;
    `

    const ReviewTitle = styled(Title)`
      align-self: flex-start;
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: bold;
    `

    const ReviewSection = styled.View`
      flex-direction: column;
      width: 100%;
      padding: 12px;
    `

    const TaskView = styled.View`
      padding: 12px;
      padding-left: 5px;
      padding-right: 20px;
    `

    const MainView = styled.View`
      padding-bottom: 60px;
    `

  if (challenge) {
    // const url = challenge.video_url
    // const lastPart = url.split("=")
    // youtubeId = lastPart[1].split("&")[0]

    

    const allTasks = challenge.task_challenges.map(tc => {
      return (
        <TaskView key={tc.id}>
          <TaskItem authorized={false} userTaskChallenge={tc.task} />
        </TaskView>
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
        setUserChallenge(fetchedUserChallenge)``
        createUTC(fetchedUserChallenge)
        setCurrentUser(fetchedUserChallenge.user)
      })

      Alert.alert(`Challenge accepted! Good luck with ${challenge.name}`)
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
        return <ReviewItem key={review.id} review={review} />
      })

      const handleReviewPress = (() => {  
        setModalVisible(true)
      })

        return (
        <MainView>
          <ImageView>          
            <ChallengeImage source={{uri: challenge.photo_url}}/>
          </ImageView>
          <TestView>
            <Title>{challenge.name}</Title>
            <TextOpacity onPress={() => history.push(`/user/${challenge.user.id}`)}> 
              <MainText>Created by:  {challenge.user.name}</MainText>          
            </TextOpacity>
            <MainText> {challenge.my_challenge_takers.length} people have taken this challenge </MainText>
          </TestView>            
          {allTasks}
          {/* Conditionally rendering based off of custom serializer attribute challenge_ids and reviewed_challenge_ids */}
          {currentUser.challenge_ids.includes(challenge.id) || clicked || currentUser.reviewed_challenge_ids.includes(challenge.id) ? 
          null
          : 
          <Button onPress={handlePress}>
            <Span>Take challenge</Span>
          </Button>}
          {currentUser.challenge_ids.includes(challenge.id) && !currentUser.reviewed_challenge_ids.includes(challenge.id) ? 
          <ReviewButton onPress={handleReviewPress}>
            <Span>Leave a Review</Span>
          </ReviewButton>
          :
          null}
          {modalVisible ? <ReviewForm setModalVisible={setModalVisible} modalVisible={modalVisible} setCurrentUser={setCurrentUser} reviews={reviews} setReviews={setReviews} challenge={challenge} currentUser={currentUser} /> : null}
          { reviews.length ? 
          <ReviewSection>
            <ReviewTitle>Reviews</ReviewTitle>
            {allReviews}
          </ReviewSection> 
          :
          null}
        </MainView>
        )
      }
      else {
        return <MainText>Loading...</MainText>
      }
  }
    
    export default ChallengeShow
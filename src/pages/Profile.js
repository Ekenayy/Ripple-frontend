import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BASE_URL } from '@env'
import UserChallengeItem from '../components/UserChallengeItem'
import {useParams, useHistory } from "react-router-dom";


function Profile ( {currentUser, setCurrentUser}) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [createdChall, setCreatedChall] = useState([])
    const [userChall, setUserChall] = useState([])
    const [selected, setSeleted] = useState([])

    let params = useParams()
    let formId

// If this user has just signed up the params id will be a number,
// If the user clicks the profile button on the nav, params will be NaN which is falsy
    
    if (parseInt(params)) {
      formId = parseInt(params)
    } else {
      formId = currentUser.id
    }
    
      useEffect(() => {
            fetch(`${BASE_URL}/users/${formId}`)
              .then(r => r.json())
              .then(thisUser => console.log(thisUser))
          }, [])

      useEffect(() => {
        console.log(formId)

        fetch(`${BASE_URL}/my_user_challenges`, {
                  method: "POST",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    user_id: formId
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.errors) {
                      console.log(data.errors)
                    } else {
                      setUserChall(data)
                      setIsLoaded(true)
                    }                   
                  })
      }, [])
        
      const Container = styled.View`
        flex-direction: column;
      `

      const UserInfo = styled.View`
        flex-direction: row;
        margin-bottom: 40px;
      `

      const Avatar = styled.View`
        width: 50%;
      `

      const Bio = styled.View`
        flex-shrink: 1;
      `

      const AvatarImage = styled.Image`
      `


      const Challenges = styled.View`
      `

      const BioText = styled.Text`
            font-size: 12px;
            color: #F7F8F3;
            margin-top: 10px;
            flex-shrink: 1;
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
      `

      
      if (userChall) {

        const userChallengeList = userChall.map(uc => {
          return <UserChallengeItem key={uc.id} userChallenge={uc} challenge={uc.challenge}/>
        })

        // console.log(parseInt(params))
        // console.log(currentUser.id)

        return (
          <Container>
            <UserInfo>
                <Avatar>
                    <AvatarImage source={{uri: currentUser.picture}}/>
                </Avatar>
                <Bio>
                  <BioText>{currentUser.name}</BioText>
                  <BioText>{currentUser.bio}</BioText>
                </Bio>
            </UserInfo>
            <Challenges>
              <Filters>
                <Button>
                  <Span>Created Challenges</Span>
                </Button>
                <Button>
                  <Span>Taken Challenges</Span>
                </Button>
              </Filters>
              <ChallengeView> 
                {userChallengeList} 
              </ChallengeView>
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
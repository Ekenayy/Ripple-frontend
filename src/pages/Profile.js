import React, {useEffect} from 'react';
import styled from 'styled-components';
import { BASE_URL } from '@env'

function Profile ( {currentUser}) {

    const MainText = styled.Text`
      font-size: 24px;
      color: #F7F8F3;
      margin-top: 10px;
      `

      useEffect(() => {
        fetch(`${BASE_URL}/users/${currentUser.id}`)
              .then(res => res.json())
              .then(data => console.log(data))
      }, [])

    
        return (
            <MainText>I'm the Profile</MainText>
        )
    }
    
    export default Profile
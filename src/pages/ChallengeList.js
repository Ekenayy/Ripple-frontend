import React from 'react';
import styled from "styled-components";
import Search from '../components/Search'
import ChallengeItem from '../components/ChallengeItem'

function ChallengeList ( {challenges} ) {

    const MainText = styled.Text`
      font-size: 24px;
      color: #F7F8F3;
      margin-top: 10px;
      `

    const MainView = styled.View`
      flex-direction: row;
      flex-wrap: wrap
    `

    const allChallenges = challenges.map(c => {
      return <ChallengeItem key={c.id} challenge={c} />
    })
    
        return (
          <>
          <Search/>
          <MainView> 
            {allChallenges}
          </MainView>
          </>
        )
    }
    
    export default ChallengeList
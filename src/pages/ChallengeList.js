import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Search from '../components/Search'
import ChallengeItem from '../components/ChallengeItem'
import { BASE_URL } from '@env'

function ChallengeList () {

  const [challenges, setChallenges] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const [searched, setSearched] = useState("")

  useEffect(() => {
    let mounted = true

      fetch(`${BASE_URL}/challenges`)
        .then(r => r.json())
        .then(data => {
          if (mounted) {
            setChallenges(data)
            setLoaded(true)
          }
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          });

          return function cleanup() {
            mounted = false
          }
  }, [])

  // useEffect(() => {
  //   if (challenges.length) {
  //     setLoaded(true)
  //   }
  // }, [challenges])



    const MainText = styled.Text`
      font-size: 24px;
      color: #F7F8F3;
      margin-top: 10px;
      `

    const MainView = styled.View`
      flex-direction: row;
      flex-wrap: wrap
      padding-bottom: 50px;
    `

    // Also need to pass the ScrollView a prop of horizontal={true}
    // const MainView = styled.ScrollView`
    //   flex-direction: row;
    //   flex-wrap: wrap
    //   padding-bottom: 50px;
    // `


  if (isLoaded) {
    const allChallenges = challenges.map(c => {
      return <ChallengeItem key={c.id} challenge={c} />
    })
    
        return (
          <>
          <Search searched={searched} setSearched={setSearched}/>
          <MainView > 
            {allChallenges}
          </MainView>
          </>
        )
  } else {
    return <MainText>Loading...</MainText>
  }
    
    }
    
    export default ChallengeList
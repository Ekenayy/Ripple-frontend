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
  
    const MainText = styled.Text`
      font-size: 24px;
      color: #F7F8F3;
      margin-top: 10px;
      `

    const MainView = styled.View`
      flex-direction: row;
      flex-wrap: wrap
      padding-bottom: 55px;
      justify-content: space-around;
    `

  if (isLoaded) {
    const allChallenges = challenges.filter(c => {
      if (searched) {
        return c.genre.toLowerCase().includes(searched.toLowerCase())
      } else {
        return c
      }
    })
    .map(c => {
      return <ChallengeItem key={c.id} challenge={c} />
    })
    
    // allChallenges.forEach(c => {
    //     c.genre
    //   return <ChallengeItem>
    //   }) 

    // Using state variable genres

    // const challengesMappedToGenres = genres.forEach(g => {
    //   if ()
    // })

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
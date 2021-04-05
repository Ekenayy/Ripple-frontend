import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CheckBox from '@react-native-community/checkbox';
import TaskItem from './TaskItem'
import {TouchableOpacity} from 'react-native'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'



function UserChallengeItem ( {challenge, setCurrentUser, userChallenge, thisUser, currentUser, setUserChallList, userChallList} ) {

    let history = useHistory()

    const {name, description, id, photo_url, video_url, user } = challenge
    const [completed, setCompleted] = useState(userChallenge.completed)
    const [deleted, setDeleted] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [utcs, setUtcs] = useState([])

    const ItemView = styled.View`
        padding: 12px;
        width: ${props => props.deleted ? '0' : "100%"}
        display: flex;
        margin-bottom: 12px;
    `
    const Avatar = styled.View`
        width:100%
    `

    const Image = styled.Image`
        width:100%;
        height:160px;
    `
    const Details = styled.View`
        width: 100%;
    `

    const Text = styled.Text`
        font-size: 12px;
        font-weight:500;
        color: #F7F8F3;
    `

    const Title = styled.Text`
        font-size: 18px;
        font-weight:500;
        color: #F7F8F3;
        font-weight: bold;
        align-self:center;
    `
    
    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
    `

    const DeleteButton = styled(Button)`
        background: #7172f5
    `

    const ButtonView = styled.View`
        flex-direction: row;
        justifyContent: space-around;
    `

    const Span = styled.Text`
        color: #F7F8F3;
        padding: 12px;
        align-self: center;
    `


    const allTasks = userChallenge.user_task_challenges.map(utc => {
        
        return (
            <TaskItem key={utc.id} utcs={utcs} authorized={currentUser.id == thisUser.id}  userTaskChallenge={utc}/>
        )

    })

    const handleComplete = () => {

    
        fetch(`${BASE_URL}/user_challenges/${userChallenge.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: true
            })
        })
            .then(r => r.json())
            .then(fetchedUserChall => {
                const newList = userChallList.filter(uc => {
                    return uc.id !== userChallenge.id
                })
                setUserChallList([...newList, fetchedUserChall])
            })
            setCompleted(true)
            
            Alert.alert(`Congratulations on completing ${name}!`)

    }

    const handleDelete = () => {

        fetch(`${BASE_URL}/user_challenges/${userChallenge.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(r => r.json())
            .then(data => {
                const newList = userChallList.filter(uc => {
                    return uc.id !== userChallenge.id
                })
                refreshUser()
                setUserChallList(newList)
                setDeleted(true)
            })
    }

    const refreshUser = () => {
        fetch(`${BASE_URL}/users/${currentUser.id}`)
            .then(r => r.json())
            .then(data => {
                setCurrentUser(data)
            })
    }

    
    return (
            <ItemView clicked={clicked} deleted={deleted}> 
                <TouchableOpacity onPress={() => history.push(`/challenges/${id}`)}> 
                <Avatar>
                    <Image source={{uri: photo_url}}/>
                </Avatar>   
                <Details>
                    <Title>{name}</Title>
                </Details>             
                </TouchableOpacity>                   
                {allTasks}
                {/* {tasksFromState} */}
                {thisUser.id == currentUser.id ? <ButtonView>
                {!completed ? 
                    <Button onPress={handleComplete}>
                        <Span>Mark Complete</Span>
                    </Button> : 
                    <Button >
                        <Span>Completed!!!</Span>
                    </Button> }  
                    <DeleteButton onPress={handleDelete}>
                        <Span>Delete</Span>
                    </DeleteButton>  
                </ButtonView> : null}
            </ItemView>
      

        
    )
}

export default UserChallengeItem
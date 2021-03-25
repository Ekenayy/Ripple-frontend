import React, { useState } from 'react';
import styled from "styled-components";
import { BASE_URL } from '@env'
import { Checkbox } from 'react-native-paper';



function TaskItem ( {userTaskChallenge, authorized} ) {

    const [stateUTC, setStateUTC] = useState(userTaskChallenge)
    const [toggleCheckBox, setToggleCheckBox] = useState(stateUTC.completed)

    const Details = styled.View`
        width: 100%;
        flex-direction: row;
    `

    const Text = styled.Text`
        font-size: 14px;
        font-weight: 600;
        color: #F7F8F3;
        align-self:center;
        padding-right: 20px;
    `
    const handleChangeValue = () => {
        

        let formBody = {
            completed: !toggleCheckBox
        }

        fetch(`${BASE_URL}/user_task_challenges/${userTaskChallenge.id}`, {
            method: "PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(fetchedUTC => {
                setStateUTC(fetchedUTC)
                setToggleCheckBox(fetchedUTC.completed)
            })
    }


    return(
        
        <Details key={userTaskChallenge.id}>
        {authorized ? <Checkbox.Android 
                disabled={false}
                onPress={handleChangeValue}
                status={toggleCheckBox ? 'checked' : 'unchecked'}
                color="#5D5FEF"
                uncheckedColor="#F7F8F3"
            /> :
            <Checkbox.Android
                disabled={true}
                status={toggleCheckBox}
                onPress={handleChangeValue}
            />
        }
            <Text>{userTaskChallenge.description}</Text>
        </Details>
    )
}

export default TaskItem
import React, { useState } from 'react';
import styled from "styled-components";
import CheckBox from '@react-native-community/checkbox';
import { BASE_URL } from '@env'
import { Checkbox } from 'react-native-paper';



function TaskItem ( {userTaskChallenge, authorized, completed, utcs, setUtcs} ) {

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

        // setToggleCheckBox(!toggleCheckBox)

    }


    return(
        
        <Details key={userTaskChallenge.id}>
        {/* {authorized ? <CheckBox 
                disabled={false}
                onValueChange={handleChangeValue}
                completed
                value={toggleCheckBox}
                onCheckColor="#5D5FEF"
            /> :
            <CheckBox 
                disabled={true}
                value={toggleCheckBox}
                onValueChange={handleChangeValue}
            />
        } */}
        {authorized ? <Checkbox 
                disabled={false}
                onPress={handleChangeValue}
                status={toggleCheckBox ? 'checked' : 'unchecked'}
                color="#5D5FEF"
                uncheckedColor="#F7F8F3"
            /> :
            <Checkbox
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
import React, { useState } from 'react';
import styled from "styled-components";
import CheckBox from '@react-native-community/checkbox';
import { BASE_URL } from '@env'


function TaskItem ( {userTaskChallenge, authorized, completed} ) {

    const [stateUTC, setStateUTC] = useState(userTaskChallenge)
    const [toggleCheckBox, setToggleCheckBox] = useState(stateUTC.completed)

    const Details = styled.View`
        width: 100%;
        flex-direction: row;
    `

    const Text = styled.Text`
        font-size: 12px;
        font-weight:500;
        color: #F7F8F3;
        align-self:center;
    `
    const handleChangeValue = (newValue) => {
        setToggleCheckBox(newValue)

        let formBody = {
            completed: newValue
        }

        fetch(`${BASE_URL}/user_task_challenges/${userTaskChallenge.id}`, {
            method: "PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(fetchedUTC =>setStateUTC(fetchedUTC))
    }


    return(
        
        <Details key={userTaskChallenge.id}>
           
        {authorized ? <CheckBox 
                disabled={false}
                onValueChange={handleChangeValue}
                completed
                value={toggleCheckBox}
            /> :
            <CheckBox 
                disabled={true}
                value={toggleCheckBox}
                onValueChange={handleChangeValue}
            />
            }
            <Text>{userTaskChallenge.description}</Text>
        </Details>
    )
}
 {/* { () => {

                if (authorized && completed) {
                    return (<CheckBox 
                        disabled={false}
                        onValueChange={handleChangeValue}
                        completed
                        value={true}
                    /> )
                } else if (authorized) {
                  return  (<CheckBox 
                    disabled={false}
                    onValueChange={handleChangeValue}
                    completed
                    value={toggleCheckBox}
                />)
                } else {
                   return  (<CheckBox 
                    disabled={true}
                    value={toggleCheckBox}
                    onValueChange={handleChangeValue}
                />)
                }
            }}  */}
export default TaskItem
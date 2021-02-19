import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { BASE_URL } from '@env'
import { Alert } from 'react-native'





function ReviewForm ( {currentUser, challenge, reviews, setReviews, setCurrentUser }) {

    const [errors, setErrors] = useState("")

    const Form = styled.View`
        padding:12px;
        flex-direction: row;
        width: 100%;
        justifyContent: space-around;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 70%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
    `

    const RatingInput = styled(Input)`
        width: 25%
    `

    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
    `
    const ErrorSpan = styled(Span)`
        color: red
        font-weight: bold;
    `

    const {register, handleSubmit, setValue} = useForm()
// , {valueAsNumber: true, required: true, max: 5, min: 1}
    useEffect(() => {
        register('rating')
        register('description')
    }, [register])

    const onSubmit = data => {

        let formBody = {
            description: data.description,
            rating: data.rating,
            challenge_id: challenge.id,
            user_id: currentUser.id
        }

        fetch(`${BASE_URL}/reviews`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(res => res.json())
            .then(newReview => {
                if (newReview.errors) {
                    setErrors(newReview.errors)
                } else {
                    setReviews([newReview, ...reviews])
                    setCurrentUser(newReview.user)
                    Alert.alert('Thanks for your review!')
                }
                
            })

    }


    return (
        <>
            <Form>
                <RatingInput 
                    placeholder="Rating (0-5)" 
                    onChangeText={text => setValue('rating', text)}
                    keyboardType="numeric"
                />                    
                {/* {errors.multipleErrorInut?.type === 'max' && "The max input is 5"}
                {errors.multipleErrorInut?.type =a== 'min' && "The min input is 1"} */}

                <Input
                    placeholder="Comment..." 
                    multline={true}
                    onChangeText={text => setValue('description', text)}
                />
            </Form>
            {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
            <Button onPress={handleSubmit(onSubmit)}>
                <Span>Submit rating</Span>
            </Button>

        </>
    
    )
        




}

export default ReviewForm
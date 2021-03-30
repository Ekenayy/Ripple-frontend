import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import { Rating } from 'react-native-ratings';

function ReviewForm ( {modalVisible, setModalVisible, currentUser, challenge, reviews, setReviews, setCurrentUser }) {

    const [errors, setErrors] = useState("")
    const [ios, setIos] = useState(Platform.OS === 'ios')

    let challengeRating 

    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 70%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
        margin-bottom: 10px;
    `
    
    const ButtonView = styled.View`
        flex-direction: row;
    `

    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const CancelButton = styled(Button)`
        background: #E379DF;
        margin-left: 5px;
    `

    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
        font-weight: bold;
    `
    const ErrorSpan = styled(Span)`
        color: red
        font-weight: bold;
    `
    const Modal1 = styled.Modal`
    `

    const ModalForm = styled.View`
        padding:10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `

    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 200px;
        width: 90%;
        align-self: center;
    `
    const FormTitle = styled.Text`
        font-size: 24px;
        color: black;
        align-self: center;
        font-weight: bold;
        margin-bottom: 10px;
    `

    const {register, handleSubmit, setValue} = useForm()
// , {valueAsNumber: true, required: true, max: 5, min: 1}
    useEffect(() => {
        register('rating')
        register('description')
    }, [register])

    const onSubmit = data => {

        setModalVisible(!modalVisible)

        let formBody = {
            description: data.description,
            rating: challengeRating,
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
                }
            })
    }

    return (
            <Modal1
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
            >
                <ModalHolder>
                    <ModalForm>
                        <Rating
                            showRating={ios ? false : true}
                            // ratingBackgroundColor="#03DAC5"
                            type="heart"
                            imageSize={ ios ? 50 : 20}
                            onFinishRating={rating => challengeRating = rating}
                            style={{ paddingVertical: 5, marginBottom: 50, paddingLeft: 0, borderRadius: 20, height: 30 }}
                        />
                        <Input
                            placeholder="Comment..." 
                            multline={true}
                            onChangeText={text => setValue('description', text)}
                        />                
                        {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                        <ButtonView>
                            <Button onPress={handleSubmit(onSubmit)}>
                                <Span>Submit rating</Span>
                            </Button>
                            <CancelButton onPress={() => setModalVisible(!modalVisible)}>
                                <Span>Cancel</Span>
                            </CancelButton>
                        </ButtonView>
                    </ModalForm>
                </ModalHolder> 
            </Modal1>
    )
}

export default ReviewForm
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native'
import {useForm} from 'react-hook-form'
import { BASE_URL, HEADERS } from '@env'
import { useHistory } from "react-router-dom";


function SignUp ( {currentUser, setCurrentUser }) {

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState("")

    let history = useHistory()
    
    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('email')
        register('picture')
    }, [register])

    const Form = styled.View`
    padding-left:12px;
    `

    const TitleView = styled.View`
        padding:12px;
        margin-bottom:0px;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 100%;
        border-radius:20px;
        padding-left: 12px;
        height: 50px;
        margin-top: 20px;
        border-radius: 20px;
    `

    const FormTitle = styled.Text`
    font-size: 24px;
    color: #F7F8F3;
    `

    const Button = styled.TouchableOpacity`
      background: #03DAC5;
      width: 120px;
      margin: 12px;
      border-radius:20px;
    `
    const Span = styled.Text`
    color: #F7F8F3
    padding: 12px;
    `

    const ErrorSpan = styled(Span)`
        color: red
    `

    const onSubmit = data => {
        let formBody = {
            name: data.name,
            email: data.email.toLowerCase(),
            picture: data.picture
        }


        fetch(`${BASE_URL}/users/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(newUser => {
                if (newUser.errors) {
                    setErrors(newUser.errors)
                } else {
                    setCurrentUser(newUser)
                    setLoaded(true)
                }
            })
    }


    useEffect(() => {
        if (currentUser) {
            history.push(`/user/${currentUser.id}`)
        } else {
            console.log('did not work')
        }
    }, [currentUser])

    console.log(errors)

    

    return (
        <Form>
            <TitleView>            
                <FormTitle>Sign Up</FormTitle>
            </TitleView>
            <Input 
                placeholder="First and Last Name"
                onChangeText={text => setValue('name', text)} 
                autoCorrect={false}
            /> 
            <Input 
                placeholder="Passsword"
                secureTextEntry={true}
            />
            <Input 
                placeholder="Email"
                onChangeText={text => setValue('email', text)}
                autoCorrect={false}
            />
            <Input 
                placeholder="Picture Url"
                onChangeText={text => setValue('picture', text)}
            />
            {/* {errors ? <ErrorSpan>{errors}</ErrorSpan> : null} */}
            {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
            <Button onPress={handleSubmit(onSubmit)}>
                <Span>Create account</Span>
            </Button>
        </Form>    
    )
}

export default SignUp
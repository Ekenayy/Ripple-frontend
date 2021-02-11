import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import { BASE_URL, HEADERS } from '@env'
import { useHistory } from "react-router-dom"

function Login ( {setCurrentUser, currentUser} ) {

    let history = useHistory()
    
    const {register, handleSubmit, setValue} = useForm()
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState("")

    const H1 = styled.Text`
    font-size: 24px;
    color: blue;
    `
    useEffect(() => {
        register('email')
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
        width: 140px;
        margin: 12px;
        border-radius:20px;
        align-self: center
    `

    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
    `

    const ErrorSpan = styled(Span)`
        color: red
    `
    const onSubmit = data => {

        let formBody = {
            email: data.email.toLowerCase(),
        }


        fetch(`${BASE_URL}/login`, {
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
            }
    }, [loaded])

    return (
        <Form>
            <TitleView>            
                <FormTitle>Login</FormTitle>
            </TitleView>
            <Input 
                placeholder="Email"
                onChangeText={text => setValue('email', text)}
            />
            {errors ? <ErrorSpan>{errors}</ErrorSpan> : null}
            <Button onPress={handleSubmit(onSubmit)}>
                <Span>Log in</Span>
            </Button>
        </Form>    
    )
}

export default Login
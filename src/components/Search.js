import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {useForm} from 'react-hook-form'


function Search ( {searched, setSearched} ) {

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('genre')
    }, [register])

    const onSubmit = data => {
        setSearched(data.genre)
    }

    const Form = styled.View`
        padding:12px;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 100%;
        border-radius:20px;
        padding-left: 12px;
        height: 50px;
    `
    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const ClearSearch = styled(Button)`
        background: #E379DF;
        margin-left: 5px;
    `
    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
        font-family: ${props => props.theme.fontFamily};
    `

    const ButtonView = styled.View`
        flex-direction: row;
        align-self: center;
    `

    return (
        <Form>
            <Input 
                placeholder="Search by genre" 
                onChangeText={text => setValue('genre', text)}
            />
            <ButtonView>
                <Button onPress={handleSubmit(onSubmit)}>
                    <Span>Search</Span>
                </Button>
                <ClearSearch onPress={() => setSearched("")}>
                    <Span>Clear Search</Span>
                </ClearSearch>
            </ButtonView>
        </Form>
    )

}

export default Search
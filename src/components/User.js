import React, {useEffect} from 'react';
import styled from "styled-components";
import { Feather } from '@expo/vector-icons';
import {useForm} from 'react-hook-form'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'

function User( {thisUser, setThisUser, modalVisible, setModalVisible} ) {

    // useEffect(() => {
    //     fetch()
    // }, [])
    const {register, errors, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('bio')
        register('picture')
        register('email')
    }, [register])


    const UserInfo = styled.View`
        flex-direction: row;
        margin-bottom: 15px;
    `
    const Avatar = styled.TouchableHighlight`
        width: 50%;
        margin-right: 12px;        
        padding-left: 12px;
        border-radius:50px;
    `
    const AvatarImage = styled.Image`
        width: 160px;
        height: 160px;
        border-radius: 80px;
    `

    const Bio = styled.View`
        flex-shrink: 1;
        flex-direction: column;
    `

    const BioText = styled.Text`
            font-size: 12px;
            color: #F7F8F3;
            margin-top: 10px;
            flex-shrink: 1;
    `

    const IconView = styled.TouchableOpacity`
        margin-top: auto;
        align-self: center;
        align-items: center;
        background-color: #E379DF;
        height:40px;
        width:40px;
        border-radius: 20px;
    `

    const Modal1 = styled.Modal`
    `
    const ModalForm = styled.View`
        padding-left:12px;
        margin-top: 50px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
        width: 90%;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 70%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
        margin-bottom: 5px;
    `
    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 50px;
        margin-left: 50px;
        margin-right 20px;
    `
    const ButtonView = styled.View`
        flex-direction: row;
        padding-bottom: 10px;
    `
    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 100px;
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

    const ClearButton = styled(Button)`
        background: #E379DF;
        margin-left: 5px;
    `

    const FormTitle = styled.Text`
        font-size: 24px;
        color: black;
        align-self: center;
        font-weight: bold;
        margin-bottom: 10px;
    `

    const handleEdit = data => {

        let formBody = {}

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                formBody[key]=value
            }
        }

        fetch(`${BASE_URL}/users/${thisUser.id}`, {
            method: 'PATCH', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r=> r.json())
            .then(updatedUser => {
                setThisUser(updatedUser)
                setModalVisible(!modalVisible)
            })

    }

    return (
        <UserInfo>
                <Avatar>
                    {thisUser.picture ? <AvatarImage source={{uri: thisUser.picture}}/> : null}
                </Avatar>
                <Bio>
                    <BioText>{thisUser.name}</BioText>
                    <BioText>{thisUser.bio}</BioText>  
                    <IconView onPress={() => setModalVisible(true)}>
                        <Feather name="edit" size={24} color="black" iconStyle="paddingTop: 10" />
                    </IconView>
                </Bio>
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
                            <FormTitle>Edit Your Account</FormTitle>
                            <Input
                                placeholder="Name..."
                                defaultValue={thisUser.name}
                                multline={true}
                                onChangeText={text => setValue('name', text)}
                            />
                            <Input
                                placeholder="Email..."
                                defaultValue={thisUser.email}
                                onChangeText={text => setValue('email', text)}
                            />
                            <Input
                                placeholder="Bio..."
                                defaultValue={thisUser.bio}
                                multline={true}
                                onChangeText={text => setValue('bio', text)}
                            />
                            
                            <Input
                                placeholder="Picture url..."
                                multline={true}
                                onChangeText={text => setValue('picture', text)}
                                defaultValue={thisUser.picture}
                            />
                            <ButtonView>
                                <Button onPress={handleSubmit(handleEdit)}>
                                    <Span>Submit</Span>
                                </Button>
                                <ClearButton onPress={() => setModalVisible(false)}>
                                    <Span>Cancel</Span>
                                </ClearButton>
                            </ButtonView>
                        </ModalForm>
                    </ModalHolder>
                </Modal1>
            </UserInfo>
    )
    
}

export default User
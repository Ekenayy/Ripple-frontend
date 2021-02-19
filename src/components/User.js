import React, {useEffect} from 'react';
import styled from "styled-components";
import {useForm} from 'react-hook-form'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 


function User( {thisUser, setThisUser, currentUser, modalVisible, setModalVisible} ) {

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
        font-size: 14px;
        color: #F7F8F3;
        margin-top: 10px;
        flex-shrink: 1;
    `

    const NameText = styled(BioText)`
        font-size: 18px;
        font-weight: bold;
    `

    const IconView = styled.TouchableOpacity`
        margin-top: auto;
        margin-left: 30px;
    `

    const Modal1 = styled.Modal`
    `
    // #FDB54A -- Nice orange
    
    const ModalForm = styled.View`
        padding:10px;
        margin-top: 50px;
        background-color: #FDB54A;
        border-radius: 20px;
        align-items: center;
        width: 90%;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 90%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
        margin-bottom: 5px;
    `
    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 80px;
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


if (!thisUser) {
    return null
} else {

    return (
        <UserInfo>
                <Avatar>
                    {thisUser.picture ? <AvatarImage source={{uri: thisUser.picture}}/> : null}
                </Avatar>
                <Bio>
                    <NameText>{thisUser.name}</NameText>
                    <BioText>{thisUser.bio}</BioText>  
                    {currentUser.id == thisUser.id ? <IconView onPress={() => setModalVisible(true)}>
                        <FontAwesome name="pencil-square-o" size={24} color="#f582f0" />
                    </IconView> 
                    : 
                    null}
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
}

export default User
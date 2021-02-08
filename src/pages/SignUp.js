import React, {useState} from 'react';
import styled from 'styled-components';

function SignUp ( {currentUser, setCurrentUser }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

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
    

    return (
        <Form> 
            <TitleView>            
                <FormTitle>Sign Up</FormTitle>
            </TitleView>
            <Input 
                placeholder='Name...'
                onChangeText={(val) => setName(val)}
                value={name}
                blurOnSubmit={false}
                // autoFocus={true}
            /> 
            <Input
                placeholder='Email...'
                onChangeText={(val) => setEmail(val)}
                value={email}
                // autoFocus={true}
            />
            <Button>
                <Span>Create account</Span>
            </Button>       
        </Form>
    )
}

export default SignUp
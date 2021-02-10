import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function Welcome () {

  let history = useHistory()

  const MainText = styled.Text`
    font-size: 24px;
    color: #F7F8F3;
    align-self: center;
    padding-top: 130px;
  `

  const SmallText = styled.Text`
    font-size: 14px;
    color: #F7F8F3;
    align-self: center;
    margin-top: 5px;
  `

  const MainView = styled.View`
    padding-left: 12px;
    height: 100%;
  `

  const LoginButton = styled.TouchableOpacity`
      background: #03DAC5;
      width: 100px;
      border-radius:20px;
  `

  const SignUpButton = styled.TouchableOpacity`
    background: #E379DF;
    width: 100px;
    border-radius:20px;
  `
  const Span = styled.Text`
    color: #F7F8F3
    padding: 12px;
    align-self: center;
  `

  const TextView = styled.View`

  `

  const OptionView = styled.View`
    flex-direction: row;
    justifyContent: space-around;
    padding-top: 60px;
  `


    return (
      <MainView>
        <TextView>
          <MainText>There's no such thing as a small act of kindness. Every act creates a ripple with no logical end.</MainText>
          <SmallText> - Scott Adams</SmallText>
        </TextView>
        <OptionView>
          <LoginButton onPress={() => history.push(`/login`)}>
              <Span>Login</Span>
            </LoginButton>
            <SignUpButton onPress={() => history.push(`/signup`)}>
              <Span>Sign Up</Span>
            </SignUpButton>
        </OptionView>
      </MainView>
    )
}

export default Welcome
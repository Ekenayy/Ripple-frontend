import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import logo from "../Ripple-Logo-2-transparent.png"


function Welcome () {

  let history = useHistory()

  // const MainView = styled.ScrollView`
  //     flex-direction: row;
  //     flex-wrap: wrap
  //     padding-bottom: 50px;
  //   `

  const MainView = styled.View`
    padding-left: 12px;
    height: 100%;
  `

  const LoginButton = styled.TouchableOpacity`
      background: #03DAC5;
      width: 100px;
      border-radius:20px;
  `

  const SignUpButton = styled(LoginButton)`
    background: #E379DF;
  `
  const Span = styled.Text`
    color: #F7F8F3
    padding: 12px;
    align-self: center;
  `

  const StatsView = styled.ScrollView`
    flex-direction: row;
    flex-wrap: wrap
    align-self: center;
  `
  
  const StatItem = styled.View`
    flex-direction: row;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-right: 20px;
    background-color: #FDB54A;
    border-radius: 20px;
  `

  const Avatar = styled.View`
    padding-left: 10px;
  `
  const Image = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
  `

  const TextView = styled.View`
    align-self: center;
  `

  const NumberText = styled.Text`
    font-size: 35px;
    color: #F7F8F3;
    align-self: center;
    padding-top: 10px;
    font-weight: bold;
  `
  
  const DetailsText = styled(NumberText)`
    font-size: 16px;
    font-weight: normal;
    padding-right: 10px;
    color: black;
  `

  const OptionView = styled.View`
    flex-direction: row;
    justifyContent: space-around;
    margin-top: 30px;
  `

  const Logo = styled.Image`
    width: 360px;
    height: 160px;
  `

  const LogoView = styled.View`
    align-self: center;
    padding-top: 50px;
  `

  // source={{uri: photo_url}}

    return (
      <MainView>
        <LogoView>
          <Logo source={logo}/>
        </LogoView>
        <StatsView horizontal={true}>
          <StatItem>
            <Avatar>
              <Image source={{uri: "https://t3.ftcdn.net/jpg/02/59/80/56/360_F_259805610_zwLLYPs35RoaiaDESXJ2DCviM9yCbmJR.jpg"}}/>
            </Avatar>
            <TextView>
              <NumberText>50</NumberText>
              <DetailsText>Grandmas Hugged</DetailsText>
            </TextView>
          </StatItem>

          <StatItem>
            <Avatar>
              <Image source={{uri: "https://www.freevector.com/uploads/vector/preview/25661/gossip4.jpg"}}/>
            </Avatar>
            <TextView>
              <NumberText>20</NumberText>
              <DetailsText>Childhood friends called</DetailsText>
            </TextView>
          </StatItem>

          <StatItem>
            <Avatar>
              <Image source={{uri: "https://image.freepik.com/free-vector/female-characters-with-cosmetic-facial-beauty-mask_258386-133.jpg"}}/>
            </Avatar>
            <TextView>
              <NumberText>15</NumberText>
              <DetailsText>Beauty Masks Applied</DetailsText>
            </TextView>
          </StatItem>

        </StatsView>
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
import React from 'react';
import { Link } from "react-router-native";
import styled from "styled-components";
import logo from "../Ripple-logo.png"

function Header () {
    const HeaderText = styled.Text`
        font-size: 24px;
        color: #F7F8F3;
        margin-top: 10px;
        font-weight: bold;
    `
    const Logo = styled.Image`
    height: 60px;
    width: 60px;
    `
    const HeaderView = styled.View`
        margin-bottom: 0px;
        margin-top: 10px;
        margin-left: 0px
        display: flex;
        flexDirection: row;
    `
    return (
        <HeaderView>
            <Logo source={logo}/>
            <HeaderText>Ripple</HeaderText>       
        </HeaderView>
    )
}

export default Header
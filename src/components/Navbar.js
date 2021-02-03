import React from 'react';
import { Link } from "react-router-native";
import styled from "styled-components";

function Navbar () {
    const H1 = styled.Text`
    font-size: 24px;
    color: #F7F8F3;
    `

    const FixedView = styled.View`
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%
    display: flex;
    flexDirection: row;
    `
    return (
        <FixedView>        
            <H1>Hello from the Navbar</H1>
        </FixedView>
    )
}

export default Navbar
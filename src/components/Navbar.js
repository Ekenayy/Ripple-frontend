import React from 'react';
import { Route, Link } from "react-router-native";
import styled from "styled-components";
import { StyleSheet } from "react-native"

function Navbar ( {currentUser} ) {
    const NavText = styled.Text`
    font-size: 12px;
    color: #F7F8F3;
    `

    const Nav = styled.View`
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%
    display: flex;
    flexDirection: row;
    justifyContent: space-around;
    background-color: #979797;
    `


    const styles = StyleSheet.create({
        navItem: {
            flex: 1,
            alignItems: "center",
            padding: 10
        }
    })

    const BeforeUser = () => {
        return (
            <>
                <Link style={styles.navItem} to='/login'>
                    <NavText>Login</NavText>
                </Link>
                <Link style={styles.navItem} to='/signup'>
                    <NavText>SignUp</NavText>
                </Link>
            </>
        ) 
    }

    const AfterUser = () => {
        return (
            <>
                <Link style={styles.navItem} to='/challenges'>
                    <NavText>Challenges</NavText>
                </Link>
                <Link style={styles.navItem} to='/user/:id'>
                    <NavText>Profile</NavText>
                </Link>
                <Link style={styles.navItem} to='/create_challenge'>
                    <NavText>Create</NavText>
                </Link>
            </>
        )
    }

    return (
        <Nav>
            {currentUser ? <AfterUser/> : <BeforeUser/>}
        </Nav>
    )
}

export default Navbar
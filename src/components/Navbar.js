import React from 'react';
import { Route, Link } from "react-router-native";
import styled from "styled-components";
import { StyleSheet } from "react-native"
import { useHistory } from "react-router-dom";


function Navbar ( {currentUser, setCurrentUser} ) {
    let history = useHistory()

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

    // const Opacity = styled.TouchableOpacity`
    //     alignItems: "center",
    //     padding: 10px;
    // `


    const styles = StyleSheet.create({
        navItem: {
            flex: 1,
            alignItems: "center",
            padding: 10
        }
    })

    const handleSignOut = () => {
        setCurrentUser(null)

    }

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
                    <Link style={styles.navItem}>
                        <NavText onPress={() => history.push(`/user/${currentUser.id}`)}>Profile</NavText>
                    </Link>
                <Link style={styles.navItem} to='/challenges'>
                    <NavText>Home</NavText>
                </Link>
                <Link style={styles.navItem} to='/create_challenge'>
                    <NavText>Create</NavText>
                </Link>
                <Link style={styles.navItem} to='/' onPress={handleSignOut}>
                    <NavText>Logout</NavText>
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
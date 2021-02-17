import React from 'react';
import { Route, Link } from "react-router-native";
import styled from "styled-components";
import { StyleSheet } from "react-native"
import { useHistory } from "react-router-dom";
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 





function Navbar ( {currentUser, setCurrentUser} ) {
    let history = useHistory()

    const NavText = styled.Text`
        font-size: 12px;
        color: #F7F8F3;
    `

    const Nav = styled.View`
        position: absolute;
        bottom: 0;
        height: 55px;
        width: 100%
        display: flex;
        flexDirection: row;
        justifyContent: space-around;
        background-color: #979797;
    `

    const IconView = styled.View`
        flex-direction: column;
        align-items: center;
    `

    // const Opacity = styled.TouchableOpacity`
    //     alignItems: "center",
    //     padding: 10px;
    // `


    const styles = StyleSheet.create({
        navItem: {
            flex: 1,
            alignItems: "center",
            padding: 10,
        }
    })

    const handleSignOut = () => {
        setCurrentUser(null)

    }

    const BeforeUser = () => {
        return (
            <>
                <Link style={styles.navItem} to='/login'>
                    <IconView>
                        <Entypo name="login" size={24} color="#F7F8F3" />
                        <NavText>Login</NavText>
                    </IconView>
                </Link>
                <Link style={styles.navItem} to='/signup'>
                    <IconView>
                        <Ionicons name="person-add" size={24} color="#F7F8F3" />
                        <NavText>Sign Up</NavText>
                    </IconView>
                    
                </Link>
            </>
        ) 
    }

    const AfterUser = () => {
        return (
            <>
                    <Link style={styles.navItem}>
                        <IconView>
                            <FontAwesome name="user" size={24} color="#F7F8F3" onPress={() => history.push(`/user/${currentUser.id}`)} />
                            <NavText>Profile</NavText>
                        </IconView>
                    </Link>
                <Link style={styles.navItem} to='/challenges'>
                    <IconView>
                        <Entypo name="home" size={24} color="#F7F8F3" />
                        <NavText>Home</NavText>
                    </IconView>
                </Link>
                <Link style={styles.navItem} to='/create_challenge'>
                    <IconView>
                        <Foundation name="plus" size={24} color="#F7F8F3" />
                        <NavText>Create</NavText>
                    </IconView>
                </Link>
                <Link style={styles.navItem} to='/' onPress={handleSignOut}>
                    <IconView>
                        <MaterialCommunityIcons name="logout" size={24} color="#F7F8F3" />
                        <NavText>Log Out</NavText>
                    </IconView>
                        
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
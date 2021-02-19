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
import { LinearGradient } from 'expo-linear-gradient';

function Navbar ( {currentUser, setCurrentUser} ) {
    let history = useHistory()

    const NavText = styled.Text`
        font-size: 12px;
        color: #F7F8F3;
        font-weight: bold;
    `

    const Nav = styled.View`
        position: absolute;
        bottom: 0;
        height: 55px;
        width: 100%
        display: flex;
        flexDirection: row;
        justifyContent: space-around;
        background-color: #bab6b6;
    `

    const IconView = styled.View`
        flex-direction: column;
        align-items: center;
    `

    const styles = StyleSheet.create({
        navItem: {
            flex: 1,
            alignItems: "center",
            padding: 10,
        },
        linearGradient: {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          position: 'absolute',
          height: 55,
          width: 395, 
          bottom: 0,
          borderRadius: 25
        },
    })

    // 400

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
                <Link style={styles.navItem} to='/welcome' onPress={handleSignOut}>
                    <IconView>
                        <MaterialCommunityIcons name="logout" size={24} color="#F7F8F3" />
                        <NavText>Log Out</NavText>
                    </IconView>
                        
                </Link>
            </>
        )
    }

    return (
        // <Nav>
            <LinearGradient
            style={styles.linearGradient}
            colors={['#4141b5', '#4f50ab', '#5e5eeb'  ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            >            
            {currentUser ? <AfterUser/> : <BeforeUser/>}
            </LinearGradient>
        // </Nav>
    )
}

export default Navbar
import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { TouchableOpacity} from "react-native";

function ChallengeItem ( {challenge} ) {

    let history = useHistory()

    const {name, description, id, photo_url, video_url, user, genre } = challenge

    const ItemView = styled.View`
        padding: 12px;
        border-radius: 20px;
        width: 50%;
    `
    const Avatar = styled.View`
        width:100%
    `

    const Image = styled.Image`
        width:165px;
        height:64px;
    `
    const Details = styled.View`
        width: 150px;
    `

    const Name = styled.Text`
        font-size: 18px;
        font-weight:500;
        color: #F7F8F3;
        font-family: ${props => props.theme.fontFamily};
    `
    const Span = styled.Text`
        color: #F7F8F3
        font-family: ${props => props.theme.fontFamily};
    `

    return (

        <TouchableOpacity onPress={() => history.push(`/challenges/${id}`)}>
            <ItemView >                    
                <Avatar>
                    <Image source={{uri: photo_url}}/>
                </Avatar>   
                <Details>
                    <Name>{name}</Name>
                    <Span>Genre: {genre}</Span>
                </Details>
            </ItemView>                
        </TouchableOpacity>

        
    )
}

export default ChallengeItem
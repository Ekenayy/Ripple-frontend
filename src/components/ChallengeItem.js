import React from 'react';
import styled from "styled-components";

function ChallengeItem ( {challenge} ) {

    const {name, description, id, photo_url, video_url, user } = challenge

    const ItemView = styled.View`
        padding: 12px;
        border-radius: 20px;
        width: 50%;
    `
    const Avatar = styled.View`
    `

    const Image = styled.Image`
        width:64px;
        height:64px;
    `
    const Details = styled.View`
    `

    const Name = styled.Text`
        font-size: 18px;
        font-weight:500;
    `

    return (
        <ItemView>
            <Avatar>
                <Image source={photo_url}/>
            </Avatar>
            <Details>
                <Name>{name}</Name>
            </Details>
        </ItemView>

        
    )


}

export default ChallengeItem
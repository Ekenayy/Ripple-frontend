import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";


function ReviewItem ( {review}) {
    let history = useHistory()

    const {description, rating} = review

    const RatingView = styled.View`
        borderBottomWidth: .5px;
        margin-top: 10px;
    `

    const AuthorDetails = styled.TouchableOpacity`
        flex-direction: row;
    `
    const Avatar = styled(AuthorDetails)`
    `

    const AvatarImage = styled.Image`
        width: 40px;
        height: 40px;
        border-radius: 20px;
    `

    const TextView = styled.View`
        margin-top: 10px;
        padding-bottom: 15px;
    `

    const Text = styled.Text`
        color: #F7F8F3;
        margin-left: 5px;
    `
    const Name = styled(Text)`
        align-self: flex-start;
        margin-left: 5px;
        font-weight: bold;
    `
    const InfoView = styled.View`
    `


    console.log(review)

    return( 
        <RatingView>
            <AuthorDetails onPress={() => history.push(`/user/${review.user.id}`)}>
                <Avatar>
                    <AvatarImage  source={{uri: review.user.picture}}/>
                </Avatar>
                <InfoView>
                    <Name>{review.user.name}</Name>
                    <Text>{review.user.challenge_ids.length} challenges taken</Text>
                </InfoView>
            </AuthorDetails>
            <TextView>
                <Text>{rating} out of 5</Text>
                <Text>{description}</Text>
            </TextView>
        </RatingView>
    )

}

export default ReviewItem
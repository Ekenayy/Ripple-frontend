import React from 'react';
import styled from "styled-components";

function ReviewItem ( {review}) {

    // const [description, rating] = review

    const RatingView = styled.View`
    `

    const TextView = styled.View`
    `

    const Text = styled.Text`
    `


    return( 
        <RatingView>
            <TextView>
                <Text>{review.description} -- {review.rating}</Text>
            </TextView>
        </RatingView>
    )

}

export default ReviewItem
import React from 'react';
import styled from "styled-components";

function User( {user} ) {

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Container>
            <UserInfo>
                <Avatar>
                    <AvatarImage></AvatarImage>
                </Avatar>
            </UserInfo>
            <Challenges>
            </Challenges>
        </Container>
    )
    
}

export default User
import React from 'react';
import styled from "styled-components";

function Search () {

    const Form = styled.View`
        padding:12px;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 100%;
        border-radius:20px;
        padding-left: 12px;
        height: 50px;
    `

    return (
        <Form>
            <Input placeholder="Search by genre"/>
        </Form>
    )

}

export default Search
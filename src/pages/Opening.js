import React, {useEffect} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function Opening ( {font} ) {

    let history = useHistory()

    const MainText = styled.Text`
        font-size: 24px;
        color: #F7F8F3;
        align-self: center;
        padding-top: 130px;
    `

    const SmallText = styled.Text`
        font-size: 14px;
        color: #F7F8F3;
        align-self: center;
        margin-top: 5px;
    `

    const MainView = styled.View`
        padding-left: 12px;
        height: 100%;
    `
    const TextView = styled.View`

    `
    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align-self: center;
        margin-top: 12px;
    `
    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center;
    `
    const load = async () => {
        let thisToken = ''
            try {
                thisToken = await AsyncStorage.getItem('token') || 'none'  
                
                if (thisToken !== 'none') {
                    setToken(thisToken)
                }
                // setToken(thisToken)
            } catch(e) {
                // read error
                console.log(e.message)
            }
            return thisToken
    }

    useEffect( () => {
        load()
    }, [])  

    return (
        <MainView>
            <TextView>
                <MainText>"There's no such thing as a small act of kindness. Every act creates a ripple with no logical end."</MainText>
                <SmallText> - Scott Adams</SmallText>
            </TextView>
            <Button onPress={() => history.push(`/welcome`)}>
                <Span>Continue</Span>
            </Button>
        </MainView>
    )

}

export default Opening 
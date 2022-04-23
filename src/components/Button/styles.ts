import styled from "styled-components"
import {shade} from "polished"

import colorVariables from "../../styles/colorVariables"

export const Container = styled.button`

    height:60px;
    margin-top:15px;
    background:${colorVariables.lightGreen};
    border-radius:10px;
    border:0;
    padding:16px;
    width:100%;
    transition: background-color 0.1s;
    &:hover{
        background:${shade(0.2,colorVariables.lightGreen)}
    }
    &:active{
        background:${shade(0.2,colorVariables.lightGreen)}
    }


`
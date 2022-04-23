import {createGlobalStyle} from "styled-components"
import colorVariables from "./colorVariables"

export default createGlobalStyle`

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        outline:0;
    }
    body{
        overflow:hidden;
        background:${colorVariables.darkGray};
        color:#000;
        -webkit-font-smoothing:antialiased;
    }
    body,input,button,textarea{
        font-family: 'Roboto Slab', serif;
        font-size:16px;
    }
    button{
        cursor: pointer;
    }
`
import styled,{css} from "styled-components"
import Tooltip from "../tooltip"
import colorVariables from "../../styles/colorVariables"

interface ContainerProps {
    isFocused:boolean
    isFilled:boolean
    isErrored:boolean
}

export const Container = styled.div<ContainerProps>`
    display:flex;
    background-color:transparent;
    border-radius:10px;
    border:2px solid #111;
    padding:16px;
    width:100%;
    max-height:60px;
    
    ${
        props=>props.isErrored && css`
                border: 2px solid red;
            `
    }
    ${
        props=>props.isFocused && css`
                border: 2px solid ${colorVariables.lightGreen};
            `
    }

    input{ 
        background:transparent;
        flex:1;
        border:0;
        padding-right:5px;
        width:100%;
        color:white;
        max-width:100%;
        &:active{
            background:transparent;
        }
    }
    svg{
        min-width:10%;
        margin-right:14px;
        ${
            props=>props.isErrored && css`
                color:red;
            `
        }
        ${
            props=>props.isFocused && css`
                color:${colorVariables.lightGreen};
            `
        }
        ${
            props=>props.isFilled && css`
                color:${colorVariables.lightGreen};
            `
        }
        
        
    }
    & + div{
            margin-top:15px;
    }

`
export const Error = styled(Tooltip)`
    margin-left:16px;
    svg{
        margin:0;
    }
    &:active{
        span{
            opacity:1;
            transition: opacity 0.5s;
            visibility:visible;
        }
    }
`
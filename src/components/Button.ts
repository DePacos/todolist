import styled, {css} from "styled-components";

type ButtonProps = {
    active?: boolean
}

export const Button = styled.button<ButtonProps>
`
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid gray;
    transition: transform .3s;
    
    &:hover {
    transform: scale(1.1);
}
    &:active {
        transform: translateY(-2px);
    }

${(props) => props.active && css<ButtonProps>
`
    transform: scale(1.1);
    background-color: #c6c6c6;
`}
    
`

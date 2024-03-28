import styled from "styled-components";


export const Button = styled.button
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
`

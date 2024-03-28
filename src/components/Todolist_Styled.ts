import styled from "styled-components";

const TodolistWrap = styled.div
    `
        display: grid;
        grid-template-rows: 50px 50px 1fr 50px;
        min-height: 300px;
        padding: 30px;
        background-color: #9ad2d4;
        box-shadow: 0 2px 6px;
        border-radius: 10px;

        h3 {
            text-align: center;
        }
        li{
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }
        
        li input{
            margin-right: 10px;
        }
        li span{
            flex-grow: 1;
        }
    `

const InputWrap = styled.div
    `
    display: flex;
    gap: 10px;
    height: 30px;

    input {
        padding: 5px 10px;
        width: 100%;
        border: 1px solid gray;
        border-radius: 10px;
    }
`

const ButtonWrap = styled.div
    `
        align-self: end;
        button + button {
            margin-left: 20px
        }
    `

export const S = {
    TodolistWrap,
    InputWrap,
    ButtonWrap
}
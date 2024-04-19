import React from 'react';
import {S} from './Button-Styles'


type ButtonProps = {
    title: string
    callback: () => void
    disabled?: boolean
    active?: boolean
}

export const Button = ({title, callback, disabled, active}: ButtonProps) => {
    return (
        <S.ButtonStyles active={active} disabled={disabled} onClick={callback}>{title}</S.ButtonStyles>
    );
};

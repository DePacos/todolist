import React from 'react';
import Button from "@mui/material/Button";

export const BasicButton = ({title, onClick, disabled, variant, color, type}: ButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            type={type}
            variant={variant}
            color={color}
        >
            {title}</Button>
    )
}

type BasicButton = "submit" | "button" | undefined
type Color = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
type Variant = "text" | "outlined" | "contained" | undefined

type ButtonProps = {
    title: string
    type?: BasicButton
    onClick?: () => void
    disabled?: boolean
    variant?: Variant
    color?: Color
}
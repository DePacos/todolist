import React from 'react';
import Button from "@mui/material/Button";

type ButtonType = "submit" | "button" | undefined
type ColorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
type VariantType = "text" | "outlined" | "contained" | undefined

type ButtonProps = {
    title: string
    type?: ButtonType
    onClick?: () => void
    disabled?: boolean

    variant?: VariantType
    color?: ColorType
}

export const BasicButton = React.memo(({title, onClick, disabled, variant, color, type}: ButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            type={type}
            variant={variant}
            color={color}
        >
            {title}</Button>
    );
});

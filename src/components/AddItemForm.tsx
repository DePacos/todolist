import React from "react";
import {Button} from "./Button";
import {S} from "./Todolist_Styled";

type PropsType = {
    addItem: (inputValue: string) => void
}

export const AddItemForm = ({addItem}:PropsType) => {

    const [inputValue, setInputValue] = React.useState('')

    const checkInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const inputValidate = (inValue: string, typeValidate: string, e?:React.KeyboardEvent<HTMLInputElement>) => {
        let checkInputLength = inValue.length < 21
        let checkInputSpace = inValue.trim() === ''

        if(typeValidate === 'button'){
            if(!inValue || !checkInputLength || checkInputSpace){return true}
        }

        if(typeValidate === 'keyBoard'){
            if(e?.ctrlKey && e?.code === 'Enter' && inValue && checkInputLength && !checkInputSpace){return true}
        }

        if(typeValidate === 'message'){
            return !checkInputLength
        }

        return false
    }

    const inputKeyHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(inputValidate(inputValue, 'keyBoard', e)){
            addItem(inputValue)
            setInputValue('')
        }
    }

    const addItemHandler = () =>{
        addItem(inputValue)
        setInputValue('')
    }

    return(
        <S.InputWrap>
            <input
                onChange={checkInputValue}
                value={inputValue}
                onKeyPress={inputKeyHandler}
            />
            {inputValidate(inputValue, 'message') && <span>Max task length 20 letters</span>}
            <Button disabled={inputValidate(inputValue, 'button')} title="++" callback={addItemHandler}/>
        </S.InputWrap>
    )
}
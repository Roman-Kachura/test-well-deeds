import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

export const EditText: React.FC<EditTextPropsType> = (
    {text, value, isEdit, changeHandlerCallBack, clickHandlerCallBack}
) => {
    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => changeHandlerCallBack(e.currentTarget.value);
    const keyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && value.length) return clickHandlerCallBack();
        if (e.key === 'Escape') return changeHandlerCallBack('');
    }
    return (
        <>
            {isEdit
                ? <textarea
                    placeholder='Введите текст...'
                    rows={5}
                    value={value}
                    onChange={changeHandler}
                    onKeyDown={keyPressHandler}
                />
                : <span>{text}</span>
            }
        </>
    )
}

interface EditTextPropsType {
    isEdit: boolean
    text: string
    value: string
    changeHandlerCallBack: (value: string) => void
    clickHandlerCallBack: () => void
}
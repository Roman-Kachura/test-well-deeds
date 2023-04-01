import style from './Deeds.module.scss';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useAppDispatch} from '../../store/store';
import {createUserDeed} from '../../store/reducers/deedsReducer';

export const AddDeedPanel: React.FC<AddDeedPanelPropsType> = ({uid}) => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const clickHandler = () => value.length && dispatch(createUserDeed({uid, text: value}))
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') return clickHandler();
        if (e.key === 'Escape') return setValue('');
    }
    return (
        <div className={style.addDeedPanel}>
            <input
                type="text"
                placeholder="Добавить хорошее дело :)"
                onChange={changeHandler}
                onKeyDown={keyPressHandler}
                value={value}
            />
            <button onClick={clickHandler}>+</button>
        </div>
    )
}

interface AddDeedPanelPropsType {
    uid: string
}
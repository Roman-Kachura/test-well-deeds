import style from './Deeds.module.scss';
import {EditText} from './EditText';
import React, {useState} from 'react';
import {useAppDispatch} from '../../store/store';
import {removeUserDeed, updateUserDeed} from '../../store/reducers/deedsReducer';

export const DeedItem: React.FC<DeedItemPropsType> = ({text, id, uid, isAuthUserCurrentUser}) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const changeHandler = (value: string) => setValue(value);
    const clickHandler = () => {

    }
    const removeDeed = () => dispatch(removeUserDeed({uid, id}));
    const editDeed = () => {
        setIsEdit(false);
        dispatch(updateUserDeed({text: value, id, uid}))
    }
    const changeIsEdit = () => setIsEdit(!isEdit);
    return (
        <div className={style.deedItem}>
            {
                isAuthUserCurrentUser && <EditText
                    isEdit={isEdit}
                    text={text}
                    value={value}
                    changeHandlerCallBack={changeHandler}
                    clickHandlerCallBack={clickHandler}
                />
            }

            {!isAuthUserCurrentUser && <span>{text}</span>}


            {isEdit && isAuthUserCurrentUser && <button
                onClick={editDeed}
                className={style.editBtn}
            >OK
            </button>}
            {isAuthUserCurrentUser && !isEdit && <button
                onClick={changeIsEdit}
                className={style.editBtn}
            >Редактировать
            </button>
            }
            {isAuthUserCurrentUser && <button
                onClick={removeDeed}
                className={style.removeBtn}
            >Удалить
            </button>}

        </div>
    )
}

interface DeedItemPropsType {
    text: string
    id: string
    uid: string
    isAuthUserCurrentUser: boolean
}
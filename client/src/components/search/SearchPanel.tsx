import style from './SearchPanel.module.scss';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {RootState, useAppDispatch} from '../../store/store';
import {searchUserThunk, setCurrentUser, setSearchUser} from '../../store/reducers/usersReducer';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {UserType} from '../../store/reducers/authReducer';

export const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const searchUser = useSelector<RootState, UserType>(state => state.users.searchUser);
    const [value, setValue] = useState('');
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') return clickHandler();
        if (e.key === 'Escape') return setValue('');
    }
    const clickHandler = () => {
        if (value && value.charAt(0) !== '@') return alert('Имя пользователя должно начинаться с @!');
        if (value.length) return dispatch(searchUserThunk({nick: value}));
    }
    const linkClickHandler = () => {
        setValue('');
        dispatch(setCurrentUser({user: searchUser}))
        dispatch(setSearchUser({user: {}}))
    }
    return (
        <div className={style.searchPanel}>
            <input
                type="text"
                value={value}
                placeholder={'@search_name'}
                onKeyDown={keyPressHandler}
                onChange={changeHandler}
            />
            <button onClick={clickHandler}>поиск</button>
            {searchUser.uid &&
                <NavLink
                    to={`/users/${searchUser.uid}`}
                    className={style.searchLink}
                    onClick={linkClickHandler}
                >
                    {searchUser.name}
                </NavLink>}
        </div>
    )
}
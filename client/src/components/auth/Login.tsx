import style from './Auth.module.scss';
import {Navigate, NavLink} from 'react-router-dom';
import React from 'react';
import {AuthForm} from './AuthForm';
import {RootState, useAppDispatch} from '../../store/store';
import {loginThunk, LoginValuesType} from '../../store/reducers/authReducer';
import {useSelector} from 'react-redux';

export const Login = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const login = (values: LoginValuesType) => {
        dispatch(loginThunk(values));
    }
    if(isAuth) return <Navigate to='/'/>
    return (
        <div className={style.auth}>
            <div className={style.authItem}>
                <h3 className={style.authTitle}>вход</h3>
                <AuthForm buttonText="войти" loginCallBack={login}/>
                <NavLink to="/registration" className={style.authLink}>Нет аккаунта?</NavLink>
            </div>
        </div>
    )
}


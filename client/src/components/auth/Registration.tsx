import style from './Auth.module.scss';
import {Navigate, NavLink} from 'react-router-dom';
import React from 'react';
import {AuthForm} from './AuthForm';
import {registrationThunk, RegistrationValuesType} from '../../store/reducers/authReducer';
import {RootState, useAppDispatch} from '../../store/store';
import {useSelector} from 'react-redux';

export const Registration = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const registration = (values: RegistrationValuesType) => {
        dispatch(registrationThunk(values));
    }
    if (isAuth) return <Navigate to="/"/>
    return (
        <div className={style.auth}>
            <div className={style.authItem}>
                <h3 className={style.authTitle}>Регистрация</h3>
                <AuthForm buttonText="зарегестрироваться" name nick registrationCallBack={registration}/>
                <NavLink to="/login" className={style.authLink}>Уже есть аккаунт?</NavLink>
            </div>
        </div>
    )
}
import React from 'react';
import style from './App.module.scss';
import {Header} from '../header/Header';
import {AppRoutes} from './AppRoutes';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

export const App = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    return (
        <div className={style.app}>
            {isAuth && <Header/>}
            <AppRoutes/>
        </div>
    );
}

import style from './Header.module.scss';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {logoutThunk, UserType} from '../../store/reducers/authReducer';
import {SearchPanel} from '../search/SearchPanel';

export const Header = () => {
    const authUser = useSelector<RootState, UserType>(state => state.auth.user);
    const dispatch = useAppDispatch();
    const logout = () => dispatch(logoutThunk({id: authUser.uid}));
    return (
        <header className={style.header}>
            <div className={style.headerUser}>
                <div className={style.userImage}>
                    <img
                        src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
                        alt=""/>
                </div>
                <div className={style.userInfo}>
                    <div className={style.userName}>{authUser.name}</div>
                    <NavLink to={`/user/${authUser.uid}`} className={style.userNickName}>{authUser.nick}</NavLink>
                </div>
            </div>
            <SearchPanel/>
            <button onClick={logout} className={style.headerButton}>Выйти</button>
        </header>
    )
}
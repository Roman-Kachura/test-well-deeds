import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {UserType} from '../../store/reducers/authReducer';
import style from './User.module.scss';
import {AddDeedPanel} from '../deeds/AddDeedPanel';
import {DeedItem} from '../deeds/DeedItem';
import {addUserToFriendThunk, getUserThunk} from '../../store/reducers/usersReducer';
import {DeedType, getUserDeeds} from '../../store/reducers/deedsReducer';

const UserComponent: React.FC<UserPropsType> = ({currentUser}) => {
    const authUser = useSelector<RootState, UserType>(state => state.auth.user);
    const deeds = useSelector<RootState, DeedType[]>(state => state.deeds.deeds);
    const dispatch = useAppDispatch();
    const addUserToFriend = () => {
        currentUser.uid && dispatch(addUserToFriendThunk({authId: authUser.uid, uid: currentUser.uid}))
    };
    const isCurrentUserFriend = () => authUser.friends.includes(currentUser.uid);
    const isAuthUserCurrentUser = () => authUser.uid === currentUser.uid;
    useEffect(() => {
        isAuthUserCurrentUser() && dispatch(getUserDeeds({uid: authUser.uid}));
        isCurrentUserFriend() && dispatch(getUserDeeds({uid: currentUser.uid}));
    }, [dispatch, currentUser.uid])
    return (
        <div className={style.user}>
            <div className={style.userContainer}>
                <div className={style.profile}>
                    <div className={style.profileImage}>
                        <img
                            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
                            alt=""/>
                    </div>
                    <div className={style.profileInfo}>
                        <div className={style.userName}>{currentUser.name}</div>
                        <NavLink to={`/user/${currentUser.uid}`}
                                 className={style.userNickName}>{currentUser.nick}</NavLink>
                        {!isAuthUserCurrentUser() && !isCurrentUserFriend() &&
                            <button className={style.profileButton} onClick={addUserToFriend}>Подписаться</button>}
                        {!isAuthUserCurrentUser() && isCurrentUserFriend() &&
                            <div className={style.friend}>Ваш друг</div>}
                    </div>
                </div>
                <div className={style.deeds}>
                    {authUser.uid === currentUser.uid && <AddDeedPanel uid={authUser.uid}/>}
                    {
                        deeds.map(
                            d =>
                                <DeedItem
                                    isAuthUserCurrentUser={isAuthUserCurrentUser()}
                                    text={d.text}
                                    id={d.id}
                                    uid={d.uid}
                                    key={d.id}
                                />)
                    }
                </div>
            </div>
        </div>
    )
}

export const User = () => {
    const dispatch = useAppDispatch();
    const param = useParams();
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const currentUser = useSelector<RootState, UserType>(state => state.users.currentUser);
    useEffect(() => {
        param.uid && dispatch(getUserThunk({uid: param.uid}));
    }, [param.uid]);
    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <>
            {currentUser.uid && <UserComponent currentUser={currentUser} key={currentUser.uid}/>}
        </>
    )
}

interface UserPropsType {
    currentUser: UserType
}
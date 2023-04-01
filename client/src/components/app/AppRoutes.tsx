import {Route, Routes} from 'react-router-dom';
import {Login} from '../auth/Login';
import {Registration} from '../auth/Registration';
import {User} from '../user/User';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/user/:uid" element={<User/>}/>
            <Route path="*" element={<User/>}/>
        </Routes>
    )
}
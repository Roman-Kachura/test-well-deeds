import {UserType, LoginValuesType, RegistrationValuesType} from '../store/reducers/authReducer';
import {$api} from './api';
import {AxiosResponse} from 'axios';

export const authApi = {
    login(arg: LoginValuesType) {
        return $api.post<AxiosResponse, AxiosResponse<UserType>>('/auth/login', arg);
    },
    registration(arg: RegistrationValuesType) {
        return $api.post<AxiosResponse, AxiosResponse<UserType>>('/auth/registration', arg);
    },
    logout(arg: { id: string }) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/auth/logout/${arg.id}`);
    }
}
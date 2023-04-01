import {$api} from './api';
import {AxiosResponse} from 'axios';
import {DeedType} from '../store/reducers/deedsReducer';

export const deedsApi = {
    createUserDeed(data: CreateUsersDeedValuesType) {
        return $api.post<AxiosResponse, AxiosResponse<DeedType>>('/deeds', data);
    },
    getUserDeeds(uid: string) {
        return $api.get<AxiosResponse, AxiosResponse<DeedType[]>>(`/deeds/${uid}`);
    },
    updateUserDeed(data: DeedType) {
        return $api.put<AxiosResponse, AxiosResponse<DeedType>>('/deeds', data);
    },
    removeUserDeed(data: RemoveUserDeedsValuesType) {
        return $api.delete<AxiosResponse, AxiosResponse<{}>>(`/deeds/${data.uid}/${data.id}`)
    }
}

export interface RemoveUserDeedsValuesType {
    uid: string
    id: string
}

export interface CreateUsersDeedValuesType {
    uid:string
    text:string
}
import {$api} from './api';

export const usersApi = {
    getUser(uid: string) {
        return $api.get(`/users/${uid}`)
    },
    searchUser(nick: string) {
        return $api.get(`/users/search/${nick}`)
    },
    addUserToFriend(data: AddUserToFriendValuesType) {
        return $api.post('/users/add', data)
    }
}

export interface AddUserToFriendValuesType {
    uid: string
    authId: string
}
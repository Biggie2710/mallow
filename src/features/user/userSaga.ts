import { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoginResponse, UsersResponse } from './types';
import {
    createUserFailure, createUserRequest, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, fetchUsersFailure,
    fetchUsersStart, fetchUsersSuccess, loginFailure, loginSuccess, updateUserFailure, updateUserRequest, updateUserSuccess
} from './userSlice';

const API_URL = 'https://reqres.in/api';

function* fetchUsers() {
    try {
        const response: AxiosResponse<UsersResponse> = yield call(axios.get, `${API_URL}/users?page=1`);
        const usersData: any = response.data;
        yield put(fetchUsersSuccess(usersData));
    } catch (error: any) {
        yield put(fetchUsersFailure(error.message || 'Failed to fetch users'));
    }
}

function* login(action: PayloadAction<{ email: string; password: string }>) {
    try {
        const response: LoginResponse = yield call(axios.post, `${API_URL}/login`, action.payload);
        const data = response?.data;

        if (data) {
            const userData = {
                username: action.payload.email.split('@')[0],
                token: data.token,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            yield put(loginSuccess({ data }));
        } else {
            throw new Error('Token is not available');
        }
    } catch (error: any) {
        yield put(loginFailure(error.message || 'Login failed'));
    }
}

function* createUser(action: PayloadAction<{ name: string; job: string }>) {
    try {
        yield put(createUserRequest(action.payload));
        const response: AxiosResponse = yield call(axios.post, `${API_URL}/users`, action.payload);
        yield put(createUserSuccess(response.data));
    } catch (error: any) {
        yield put(createUserFailure(error.message || 'Failed to create user'));
    }
}

function* updateUser(action: PayloadAction<{ id: number; name: string; job: string }>) {
    try {
        yield put(updateUserRequest(action.payload));
        const response: AxiosResponse = yield call(axios.put, `${API_URL}/users/${action.payload.id}`, action.payload);
        yield put(updateUserSuccess(response.data));
    } catch (error: any) {
        yield put(updateUserFailure(error.message || 'Failed to update user'));
    }
}

function* deleteUser(action: PayloadAction<number>) {
    try {
        yield put(deleteUserStart());
        const response: AxiosResponse = yield call(axios.delete, `${API_URL}/users/${action.payload}`);
        if (response.status === 204) {
            message.success('Deleted Successfully')
            yield put(deleteUserSuccess(action.payload));
        } else {
            throw new Error('Failed to delete user');
        }
    } catch (error: any) {
        yield put(deleteUserFailure(error.message || 'Delete failed'));
    }
}

export function* userSaga() {
    yield takeEvery('user/loginRequest', login);
    yield takeEvery(fetchUsersStart.type, fetchUsers);
    yield takeEvery(createUserRequest.type, createUser);
    yield takeEvery(updateUserRequest.type, updateUser);
    yield takeEvery('user/deleteUserRequest', deleteUser);
}

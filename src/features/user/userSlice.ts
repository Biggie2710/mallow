import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, User } from './types';

interface UserState {
    users: User[];
    userToken: string | null;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    userToken: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.userToken = action.payload.data.token; // Store token
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        createUserRequest: (state, action: PayloadAction<{ name: string; job: string }>) => {
            state.error = null;
        },
        createUserSuccess: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        createUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        updateUserRequest: (state, action: PayloadAction<{ name: string; job: string }>) => {
            state.error = null;
        },
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        updateUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        deleteUserRequest: (state, action: PayloadAction<number>) => {
            state.error = null;
        },
        deleteUserStart: (state) => {
            state.error = null;
        },
        deleteUserSuccess: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        deleteUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    loginSuccess,
    loginFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    deleteUserRequest,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;

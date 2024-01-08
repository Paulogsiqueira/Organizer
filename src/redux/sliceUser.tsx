import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';


export const sliceUser = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
    },
    reducers: {
        loginUser(state) {
            return { ...state, isLogged: true, };
        },
        logoutUser(state) {
            return { ...state, isLogged: false }
        },
    }
})

export default sliceUser.reducer

export const { loginUser, logoutUser } = sliceUser.actions

export const selectUser = (state: RootState) => state.user;
import { createSlice } from '@reduxjs/toolkit'

interface User {
    isLogged: boolean
}

export const sliceUser = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
    },
    reducers: {
        login(state) {
            return { ...state, isLogged: true }
        },
        logout(state) {
            return { ...state, isLogged: false }
        },
    }
})

export default sliceUser.reducer 

export const { login, logout } = sliceUser.actions

export const useUser = (state: any) => {
    return state.user as User;
  };
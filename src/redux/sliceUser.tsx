import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';


export const sliceUser = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        idUser:''
    },
    reducers: {
        loginUser(state, action: PayloadAction<string>) {
            return { ...state, idUser: action.payload, isLogged: true };
          },
        logoutUser(state) {
            return { ...state,idUser:'', isLogged: false }
        },
    }
})

export default sliceUser.reducer

export const { loginUser, logoutUser } = sliceUser.actions

export const selectUser = (state: RootState) => state.user;
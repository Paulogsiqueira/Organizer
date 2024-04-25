import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';


export const sliceUser = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        idUser: '',
        accessLevel: "0",
        userIdWanted: '',
        

    },
    reducers: {
        loginUser(state, action: PayloadAction<{ idUser: string, accessLevel: string }>) {
            const { idUser, accessLevel } = action.payload;
            return { ...state, idUser, isLogged: true, accessLevel };
        },
        logoutUser(state) {
            return { ...state, idUser: '', isLogged: false, accessLevel: '' }
        },
        wantedUser(state, action: PayloadAction<{userIdWanted:string }>){
            const { userIdWanted } = action.payload;
            return { ...state, userIdWanted };
        },
        
    }
})

export default sliceUser.reducer

export const { loginUser, logoutUser,wantedUser } = sliceUser.actions

export const selectUser = (state: RootState) => state.user;
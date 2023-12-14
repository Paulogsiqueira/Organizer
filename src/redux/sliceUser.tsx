import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface User {
    isLogged: boolean
    idUser: string;
    name: string;
    email: string;
}

export const sliceUser = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        idUser: '',
        name:'',
        email:'',
    },
    reducers: {
        loginUser(state, action: PayloadAction<User>) {
            const { idUser, name, email} = action.payload;
            return {
              ...state,
              isLogged: true,
              idUser,
              name,
              email,
            };
          },
        logoutUser(state) {
            return { ...state, isLogged: false }
        },
    }
})

export default sliceUser.reducer 

export const { loginUser, logoutUser } = sliceUser.actions

export const useUser = (state: any) => {
    return state.user as User;
  };
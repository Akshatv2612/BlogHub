import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isloggedIn: false,
        userData: null,
    },
    reducers: {
        logIn: (state, action) => {
            state.isloggedIn = true,
            state.userData = action.payload
        },
        logOut: (state, action) => {
            state.isloggedIn = false,
            state.userData = null
        }
    }
})

export const {logIn,logOut} = authSlice.actions
export default authSlice.reducer

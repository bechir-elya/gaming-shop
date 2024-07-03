import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const userSlice = createSlice({
    name: 'user',
    initialState: { userConnected: false },
    reducers: {
        setUserConnected: (state) => {
            state.userConnected = true;
        },

        setUserDisconnected: (state) => {
            state.userConnected = false;
            Cookies.remove('token');
        },
    }
})

export const { setUserConnected, setUserDisconnected } = userSlice.actions;
export const isLogged = (state) => state.user.userConnected;
export default userSlice.reducer; 

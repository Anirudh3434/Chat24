import { createSlice } from "@reduxjs/toolkit";

// Define the initial state with values from local storage if available
const initialState = {
    status: localStorage.getItem('authStatus') || 'idle',
    key: JSON.parse(localStorage.getItem('keyList')) || []
};

const storeSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state) => { 
            state.status = 'loggedIn';
            localStorage.setItem('authStatus', state.status); 
        },
        logOut: (state) => { 
            state.status = 'idle';
            localStorage.setItem('authStatus', state.status); 
        },
        addKey: (state, action) => {
            state.key.push(action.payload);
            localStorage.setItem('keyList', JSON.stringify(state.key)); // Update local storage with new key list
        },
        clearKeys: (state) => {
            state.key = [];
            localStorage.removeItem('keyList'); 
        }
    }
});

export const { logIn, logOut, addKey, clearKeys } = storeSlice.actions;
export default storeSlice.reducer;

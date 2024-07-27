import { createSlice } from "@reduxjs/toolkit";

// Define the initial state with values from local storage if available
const initialState = {
    status: localStorage.getItem('authStatus') || 'idle',
   
    messageLength : localStorage.getItem('MsdLength') || 0
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
        updateMessageLength: (state, action) => {
            state.messageLength = action.payload;
            localStorage.setItem('MsdLength', state.messageLength);
        }

    }
});

export const { logIn, logOut, updateMessageLength } = storeSlice.actions;
export default storeSlice.reducer;

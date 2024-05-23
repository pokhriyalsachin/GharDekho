import { createSlice } from '@reduxjs/toolkit';

const initialState={
    currentUser: null,
    loading: false,
    error: null
}

const Userslice = createSlice({
    name: 'User',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading=true;
        },
        signInsucess: (state, action)=>{
            state.currentUser= action.payload;
            state.loading = false;
            state.error= null;
        },
        signInFailure: (state, action)=>{
            state.loading = false;
            state.error= action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
          },
          updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          deleteUserStart: (state) => {
            state.loading = true;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          signOutUserStart: (state) => {
            state.loading = true;
          },
          signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },

    }
});

export const { signInFailure ,signInStart, signInsucess,updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,
    signOutUserFailure,
    signOutUserSuccess,
    signOutUserStart,}= Userslice.actions;

export default Userslice.reducer;
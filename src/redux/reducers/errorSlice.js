import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        message: null,  // Initial error message
        isError: false, // Initial error state
    },
    reducers: {
        setError: (state, action) => {
            state.message = action.payload; // Set error message from action payload
            state.isError = true;            // Mark as error
        },
        clearError: (state) => {
            state.message = null; // Clear the error message
            state.isError = false; // Reset error state
        },
    },
});

// Exporting the actions for use in components or middleware
export const { setError, clearError } = errorSlice.actions;

// Exporting the reducer to be included in the store
export default errorSlice.reducer;

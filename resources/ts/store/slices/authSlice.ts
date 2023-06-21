import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: STORE.Slices.IAuthSlice = {
	isLogged: false,
	token: "",
	user: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		removeUser: () => initialState,
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setUser: (state, action: PayloadAction<STORE.Slices.IAuthSlice>) => {
			console.log(action);
			state.isLogged = action.payload.isLogged;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
	},
});

// Action creators are generated for each case reducer function
export const { removeUser, setToken, setUser } = authSlice.actions;

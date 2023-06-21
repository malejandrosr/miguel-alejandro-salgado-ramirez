import { combineReducers } from "redux";
import { FLUSH, PAUSE, PURGE, PERSIST, REGISTER, REHYDRATE, persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "localforage";

import { api } from "@api/manager";
import * as slices from "./slices";

const reducers = combineReducers({
	...Object.entries(slices).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: value.reducer,
		}),
		{},
	),
	[api.reducerPath]: api.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { removeUser } from "@store/slices/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as STORE.ISlice).authSlice;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithReAuth = async (
	args: FetchArgs | string,
	api: BaseQueryApi,
	options: Record<string, any> = {},
) => {
	const result = await baseQuery(args, api, options);

	if (result.error && result.error.status === 401) {
		api.dispatch(removeUser());
	}

	return result;
};

const baseQueryWithRetry = retry(baseQueryWithReAuth, { maxRetries: 1 });

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRetry,
	tagTypes: ["user", "users", "product", "products"],
	endpoints: () => ({}),
});

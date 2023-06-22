import { isEmpty } from "lodash";
import { stringify } from "qs";

import { api } from "./manager";

const name = "users";

export const users = api.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * Index method for get users paginated endpoint
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		getUsersList: builder.query<
			GENERAL.IPaginate<GENERAL.Models.IUser>,
			API.Users.IGetUsersQuery
		>({
			query: (params) => {
				const parsedParams = params && !isEmpty(params) ? `?${stringify(params)}` : "";

				return {
					method: "GET",
					url: `${name}${parsedParams}`,
					headers: {
						"Content-Type": "application/json",
					},
				};
			},
			providesTags: ["users"],
			extraOptions: { maxRetries: 0 },
		}),
	}),
});

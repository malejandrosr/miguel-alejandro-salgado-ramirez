import { isEmpty } from "lodash";
import { stringify } from "qs";

import { buildFormData } from "@helpers";
import { api } from "./manager";

const name = "admin/products";

export const products = api.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * Index method for get users paginated endpoint
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		getProductsList: builder.query<
			GENERAL.IPaginate<GENERAL.Models.IProduct>,
			API.Products.IGetProductsQuery
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
			providesTags: ["products"],
			extraOptions: { maxRetries: 0 },
		}),
		/**
		 * Store method for save / update a product
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		persistProduct: builder.mutation<{ data: string }, API.Products.IPersistProductParams>({
			query: (body) => {
				const { uuid, ...other } = body;

				return {
					method: "POST",
					url: uuid ? `${name}/${uuid}` : `${name}`,
					body: buildFormData({ ...other, _method: uuid ? "PUT" : undefined }),
				};
			},
			invalidatesTags: ["products", "product"],
			extraOptions: { maxRetries: 0 },
		}),
		/**
		 * Get method for detail a product
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		getProuduct: builder.query<{ data: GENERAL.Models.IProduct }, string>({
			query: (uuid) => ({
				method: "GET",
				url: `${name}/${uuid}`,
			}),
			providesTags: ["product"],
			extraOptions: { maxRetries: 0 },
		}),
		/**
		 * Delete method for delete a product
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		deleteProduct: builder.mutation<{ data: string }, string>({
			query: (uuid) => ({
				method: "DELETE",
				url: `${name}/${uuid}`,
			}),
			invalidatesTags: ["products", "product"],
			extraOptions: { maxRetries: 0 },
		}),
		/**
		 * Delete method for delete a product
		 *
		 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
		 */
		disableProduct: builder.mutation<{ data: string }, string>({
			query: (uuid) => ({
				method: "POST",
				url: `${name}/${uuid}/disable`,
				body: buildFormData({ _method: "PATCH" }),
			}),
			invalidatesTags: ["products", "product"],
			extraOptions: { maxRetries: 0 },
		}),
	}),
});

/**
 * Api types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace API {
	/**
	 * This namespace is for auth api
	 */
	namespace Auth {
		/**
		 * Interface for login response
		 */
		export interface ILogin {
			token: string;
			user: GENERAL.Models.IUser;
		}

		/**
		 * Interface for login body params
		 */
		export interface ILoginParams {
			email: string;
			password: string;
		}

		/**
		 * Interface for logout response
		 */
		export interface ILogout {
			logout: boolean;
		}
	}

	/**
	 * This namespace is for base api
	 */
	namespace Base {
		export interface IGetParams {
			module: string;
			params?: Record<string, any>;
			tags?: Array<any>;
		}

		export interface IPersistParams {
			module: string;
			body: any;
			method: "POST" | "PUT";
			tags?: Array<any>;
		}

		export interface IDeleteParams {
			module: string;
			tags?: Array<any>;
		}

		export interface IGetFileParams {
			module: string;
			params: {
				name: string;
			};
		}
	}

	/**
	 * This namespace is for users api
	 */
	namespace Users {
		export interface IGetUsersQuery {}
	}

	/**
	 * This namespace is for products api
	 */
	namespace Products {
		export interface IGetProductsQuery {}

		export interface IPersistProductParams {
			uuid?: string;
			sku: string;
			dollar_price: number;
			peso_price: number;
			points: number;
			name: {
				es: string;
				en: string;
			};
			short_description: {
				es: string;
				en: string;
			};
			long_description?: {
				es?: string | null;
				en?: string | null;
			};
		}
	}
}

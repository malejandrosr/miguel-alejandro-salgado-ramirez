/**
 * Main types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace GENERAL {
	/**
	 * This namespace is for models
	 */
	namespace Models {
		/**
		 * Interface for address model
		 */
		export interface IAddress {
			id: number;
			uuid: string;
			addressable_id: number;
			addressable_type: string;
			street: string;
			outer_number: string;
			inner_number: string | null;
			zip_code: string;
			colony: string;
			city: string;
			state_id: number;
			references: string | null;
			lat: number | null;
			lng: number | null;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
			addressable?: any | null;
			state?: IState | null;
		}

		/**
		 * Interface for admin model
		 */
		export interface IAdmin {
			id: number;
			uuid: string;
			avatar: string | null;
			name: string;
			lastname: string | null;
			email: string;
			email_verified_at: string | null;
			password: string;
			remember_token: string | null;
			disabled: boolean;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
		}

		/**
		 * Interface for permission model
		 */
		export interface IPermission {
			id: number;
			uuid: string;
			name: string;
			description: string;
			guard_name: string;
			created_at: string | null;
			updated_at: string | null;
			admins?: Array<IAdmin> | null;
			roles?: Array<IRole> | null;
			users?: Array<IUser> | null;
			permissions?: Array<IPermission> | null;
			admins_count?: number | null;
			roles_count?: number | null;
			users_count?: number | null;
			permissions_count?: number | null;
		}

		/**
		 * Interface for role model
		 */
		export interface IRole {
			id: number;
			uuid: string;
			name: string;
			description: string;
			guard_name: string;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
			admins?: Array<IAdmin> | null;
			permissions?: Array<IPermission> | null;
			users?: Array<IUser> | null;
			admins_count?: number | null;
			permissions_count?: number | null;
			users_count?: number | null;
		}

		/**
		 * Interface for state model
		 */
		export interface IState {
			id: number;
			uuid: string;
			name: string;
			short_name: string;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
			addresses?: Array<IAddress> | null;
			addresses_count?: number | null;
		}

		/**
		 * Interface for user model
		 */
		export interface IUser {
			id: number;
			uuid: string;
			avatar: string | null;
			name: string;
			lastname: string | null;
			phone: string;
			email: string;
			email_verified_at: string | null;
			password: string;
			remember_token: string | null;
			disabled: boolean;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
			stripe_id: string | null;
			pm_type: string | null;
			pm_last_four: string | null;
			trial_ends_at: string | null;
			addresses?: Array<IAddress> | null;
			addresses_count?: number | null;
			roles?: Array<IRole> | null;
			roles_count?: number | null;
		}

		/**
		 * Interface for product model
		 */
		export interface IProduct {
			id: number;
			uuid: string;
			sku: string;
			dollar_price: number;
			peso_price: number;
			points: number;
			active: boolean;
			created_at: string | null;
			updated_at: string | null;
			deleted_at: string | null;
			product_translations?: Array<IProductTranslation> | null;
			product_translations_count?: number | null;
		}

		/**
		 * Interface for product translation model
		 */
		export interface IProductTranslation {
			product_id: number;
			name: string;
			short_description: string;
			long_description: string | null;
			url: string;
			language: string;
			created_at: string | null;
			updated_at: string | null;
			product?: App.Models.Product | null;
		}
	}

	/**
	 * Interface for models paginate
	 */
	export interface IPaginate<T> {
		current_page: number;
		data: Array<T>;
		first_page_url: string;
		from: null;
		last_page: number;
		last_page_url: string;
		links: Array<{
			url: null | string;
			label: string;
			active: boolean;
		}>;
		next_page_url: null;
		path: string;
		per_page: number;
		prev_page_url: null;
		to: null;
		total: number;
	}

	/**
	 * Interface for (Private/Public)Route components
	 */
	export interface IRoute {
		component: (
			props: any,
		) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
	}

	/**
	 * Interface for server error
	 */
	export interface IServerError {
		data: {
			code: number;
			error: string;
			message: string | Record<string, any>;
		};
		status: number;
	}
}

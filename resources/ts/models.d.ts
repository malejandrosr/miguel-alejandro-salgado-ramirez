/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
	export interface Administrator {
		id: number;
		uuid: string;
		avatar: string | null;
		name: string;
		lastname: string;
		email: string;
		password: string;
		email_verified_at: string | null;
		remember_token: string | null;
		disabled: boolean;
		created_at: string | null;
		updated_at: string | null;
		deleted_at: string | null;
	}

	export interface Product {
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
		product_translations?: Array<App.Models.ProductTranslation> | null;
		product_translations_count?: number | null;
	}

	export interface ProductTranslation {
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

	export interface User {
		id: number;
		uuid: string;
		avatar: string | null;
		name: string;
		lastname: string;
		phone: string | null;
		email: string;
		password: string;
		email_verified_at: string | null;
		remember_token: string | null;
		disabled: boolean;
		created_at: string | null;
		updated_at: string | null;
		deleted_at: string | null;
		stripe_id: string | null;
		pm_type: string | null;
		pm_last_four: string | null;
		trial_ends_at: string | null;
	}
}

declare namespace App.Models.Authorization {
	export interface Permission {
		id: number;
		uuid: string;
		name: string;
		description: string;
		guard_name: string;
		created_at: string | null;
		updated_at: string | null;
		deleted_at: string | null;
		administrators?: Array<App.Models.Administrator> | null;
		roles?: Array<App.Models.Authorization.Role> | null;
		users?: Array<App.Models.User> | null;
		permissions?: Array<App.Models.Authorization.Permission> | null;
		administrators_count?: number | null;
		roles_count?: number | null;
		users_count?: number | null;
		permissions_count?: number | null;
	}

	export interface Role {
		id: number;
		uuid: string;
		name: string;
		description: string;
		guard_name: string;
		created_at: string | null;
		updated_at: string | null;
		deleted_at: string | null;
		administrators?: Array<App.Models.Administrator> | null;
		permissions?: Array<App.Models.Authorization.Permission> | null;
		users?: Array<App.Models.User> | null;
		administrators_count?: number | null;
		permissions_count?: number | null;
		users_count?: number | null;
	}
}

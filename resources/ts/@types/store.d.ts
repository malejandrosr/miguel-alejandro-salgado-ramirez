/**
 * Store types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace STORE {
	/**
	 * This namespace is for all slices
	 */
	namespace Slices {
		/**
		 * Interface for AuthSlice
		 */
		export interface IAuthSlice {
			isLogged: boolean;
			token: string;
			user: GENERAL.Models.IUser | undefined;
		}
	}

	/**
	 * Interface for all slices
	 */
	export interface ISlice {
		authSlice: STORE.Slices.IAuthSlice;
	}
}

/**
 * Components types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace COMPONENTS {
	/**
	 * This namespace is for auth custom components
	 */
	namespace Auth {
		/**
		 * Interface for Layout component
		 */
		export interface ILayout {
			children: React.ReactElement | Array<React.ReactElement>;
		}
	}

	namespace Products {
		export interface IProductDetailProps {
			uuid: string;
			opened: boolean;
			onClose: () => void;
		}

		export interface IProductDetailCardParentProps {
			children: React.JSX.Element | React.JSX.Element[];
			isLoading: boolean;
			spacing?: import("@mantine/core").MantineNumberSize | number;
		}

		export interface IProductFormProps {
			innerProps: {
				product?: GENERAL.Models.IProduct;
			};
		}
	}

	/**
	 * Interface for auth components folder
	 */
	export interface IAuth {
		Layout: (props: Auth.ILayout) => JSX.Element;
	}
}

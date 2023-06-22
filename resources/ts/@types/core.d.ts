/**
 * Core types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace CORE {
	/**
	 * This namespace is for all core components
	 */
	namespace Components {
		/**
		 * Interface for AppShell component
		 */
		export interface IAppShell {
			children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
		}

		/**
		 * Interface for Avatar component
		 */
		export interface IAvatar extends Partial<import("@mantine/core").AvatarProps> {
			name: string;
			borderColor?: string;
			borderSize?: number;
			icon?: (props: any) => JSX.Element;
		}

		/**
		 * Interface for Header component
		 */
		export interface IHeader {
			opened: boolean;
			setOpened: React.Dispatch<React.SetStateAction<boolean>>;
		}

		/**
		 * Interface for FormProvider component
		 */
		export interface IFormProvider
			extends Partial<import("react-hook-form").FormProviderProps> {
			children: React.ReactNode | Array<React.ReactNode>;
			onSubmit: () => void;
			methods: import("react-hook-form").UseFormReturn<any, any>;
		}

		/**
		 * Interface for RHFAutocomplete component
		 */
		export interface IRHFAutocomplete
			extends Partial<import("@mantine/core").AutocompleteProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			param: string;
			query?: Record<string, any>;
			labelKey?: string;
			valueKey?: string;
			callback: (value: any) => void;
			buildOptions: (data: Array<any>) => Array<any>;
		}

		/**
		 * Interface for RHFCheckbox component
		 */
		export interface IRHFCheckbox
			extends Partial<import("@mantine/core").CheckboxProps>,
				RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFColorInput component
		 */
		export interface IRHFColorInput
			extends Partial<import("@mantine/core").ColorInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFColorPicker component
		 */
		export interface IRHFColorPicker
			extends Partial<import("@mantine/core").ColorPickerProps>,
				React.RefAttributes<HTMLDivElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFDatePicker component
		 */
		export interface IRHFDatePickerInput
			extends Partial<import("@mantine/dates").DatePickerInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			placeholder: string;
			locale: "es" | "en";
			format: string;
		}

		/**
		 * Interface for RHFDateRangePicker component
		 */
		export interface IRHFDateRangeInputPicker
			extends Partial<import("@mantine/dates").DatePickerInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			placeholder: string;
			locale: "es" | "en";
			format: string;
		}

		/**
		 * Interface for RHFFileInput component
		 */
		export interface IRHFFileInputFileValue {
			file: File;
		}

		export interface IRHFFileInputValueComponent {
			value: null | File | File[];
		}

		export interface IRHFFileInput
			extends Partial<import("@mantine/core").FileInputProps>,
				React.RefAttributes<HTMLButtonElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFMultiSelect component
		 */
		export interface IRHFMultiSelect
			extends Partial<import("@mantine/core").MultiSelectProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			clearable?: boolean;
			data: Array<string | SelectItem>;
		}

		/**
		 * Interface for RHFNumberInput component
		 */
		export interface IRHFNumberInput
			extends Partial<import("@mantine/core").NumberInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFPasswordInput component
		 */
		export interface IRHFPasswordInput
			extends Partial<import("@mantine/core").PasswordInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			onChange?: (value: any) => void;
		}

		/**
		 * Interface for RHFSelect component
		 */
		export interface IRHFSelect
			extends Partial<import("@mantine/core").SelectProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			clearable?: boolean;
			data: Array<string | SelectItem>;
		}

		/**
		 * Interface for RHFSwitch component
		 */
		export interface IRHFSwitch
			extends Partial<import("@mantine/core").SwitchProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
			onChange?: (value: any) => void;
		}

		/**
		 * Interface for RHFTextarea component
		 */
		export interface IRHFTextarea
			extends Partial<import("@mantine/core").TextareaProps>,
				React.RefAttributes<HTMLTextAreaElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for RHFTextInput component
		 */
		export interface IRHFTextInput
			extends Partial<import("@mantine/core").TextInputProps>,
				React.RefAttributes<HTMLInputElement> {
			label?: string;
			name: string;
		}

		/**
		 * Interface for Navbar component
		 */
		export interface INavbar {
			opened: boolean;
		}

		/**
		 * Interface for NavLink component
		 */
		export interface INavLink {
			icon: import("@tabler/icons-react").Icon;
			label: string;
			to: string;
		}

		/**
		 * Interface for NavGroupLink component
		 */
		export interface INavGroupLink {
			icon: import("@tabler/icons-react").Icon;
			label: string;
			root: string;
			links: Array<INavLink>;
		}

		/**
		 * Interface for PrivateRoute component
		 */
		export type IPrivateRoute = GENERAL.IRoute;

		/**
		 * Interface for PublicRoute component
		 */
		export type IPublicRoute = GENERAL.IRoute;

		/**
		 * Interface for SimpleTable component
		 */
		export interface ISimpleTable
			extends Partial<import("mantine-react-table").MantineReactTableProps> {
			cols: Array<any>;
			getQueryFn: (page: number, search: string, size?: number) => any;
			actions?: (props: {
				row: MRT_Row<TData>;
				table: MRT_TableInstance<TData>;
			}) => React.ReactNode;
		}
	}

	/**
	 * This namespace is for all core layouts
	 */
	namespace Layouts {
		/**
		 * Interface for PageLayout component
		 */
		export interface IPageLayout {
			px?: number;
			py?: number;
			children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
		}

		/**
		 * Interface for StaticPageLayout component
		 */
		export interface IStaticPageLayout {
			px?: number;
			py?: number;
		}
	}

	/**
	 * This namespace is for all core providers
	 */
	namespace Providers {
		/**
		 * Interface for CustomMantineProvider component
		 */
		export interface ICustomMantineProvider
			extends Partial<import("@mantine/core").MantineProviderProps> {
			children: ReactElement | Array<ReactElement>;
		}

		/**
		 * Interface for CustomModalsProvider component
		 */
		export interface ICustomModalsProvider {
			children: React.ReactNode | Array<React.ReactNode>;
			modals: Record<string, any>;
		}
	}
}

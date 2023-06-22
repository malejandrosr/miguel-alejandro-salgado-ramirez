import { ProductsForm } from "@components/products";

export const modals = {
	productsFormModal: ProductsForm,
};

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

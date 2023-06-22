import { useMemo, useState } from "react";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals, openContextModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconEye, IconPencil, IconPlus, IconTrash, IconX } from "@tabler/icons-react";

import { products as productsApi } from "@api/products";
import { ProductsDetail } from "@components/products";
import { SimpleTable } from "@core/components";

const { useGetProductsListQuery, useDeleteProductMutation, useDisableProductMutation } =
	productsApi;

const ProductsList = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const [productUuid, setProductUuid] = useState<string>("");

	const getProductQuery =
		(params: API.Products.IGetProductsQuery) => (page: number, search: string, size?: number) =>
			useGetProductsListQuery({ page, search, size, ...params });

	const [deleteProduct] = useDeleteProductMutation();
	const [disableProduct] = useDisableProductMutation();

	const onDetailProduct = (uuid: string) => {
		setProductUuid(uuid);
		open();
	};

	const onOpenProductsFormModal = (product?: GENERAL.Models.IProduct) => {
		openContextModal({
			modal: "productsFormModal",
			title: `${!product ? "Nuevo" : "Editar"} Producto`,
			innerProps: {
				product,
			},
		});
	};

	const onDeleteProduct = (product: GENERAL.Models.IProduct) => {
		modals.openConfirmModal({
			title: "Eliminar Producto",
			centered: true,
			children: (
				<Text size="sm">
					Estás seguro de querer eliminar el producto con sku {product.sku} del listado?
					Esta acción es permanente
				</Text>
			),
			labels: { confirm: "Eliminar", cancel: "Cancelar" },
			onConfirm: async () => {
				const { data } = await deleteProduct(product.uuid).unwrap();

				notifications.show({
					title: "Exito!",
					message: `${data}`,
				});
			},
		});
	};

	const onDisableProduct = async (uuid: string) => {
		const { data } = await disableProduct(uuid).unwrap();

		notifications.show({
			title: "Exito!",
			message: `${data}`,
		});
	};

	const cols = useMemo<MRT_ColumnDef<GENERAL.Models.IProduct>[]>(
		() => [
			{
				accessorKey: "sku",
				header: "Sku",
				id: "sku",
			},
			{
				accessorFn: (row) => <Text weight={600}>${row.dollar_price} USD</Text>,
				header: "Precio Dolares",
				id: "dollar_price",
			},
			{
				accessorFn: (row) => <Text weight={600}>${row.peso_price} MXN</Text>,
				header: "Precio Pesos",
				id: "peso_price",
			},
			{
				accessorKey: "points",
				header: "Puntos",
				id: "points",
			},
			{
				accessorFn: (row) => <Text weight={600}>{row.active ? "Activo" : "Inactivo"}</Text>,
				header: "Activo",
				id: "active",
			},
		],
		[],
	);

	const actions = ({ row }: { row: MRT_Row<GENERAL.Models.IProduct> }) => [
		<Menu.Item
			key="detail"
			icon={<IconEye size={16} />}
			onClick={() => onDetailProduct(row.original.uuid)}
		>
			Detalle
		</Menu.Item>,
		<Menu.Item
			key="update"
			icon={<IconPencil size={16} />}
			onClick={() => onOpenProductsFormModal(row.original)}
		>
			Editar
		</Menu.Item>,
		<Menu.Item
			key="disable"
			icon={row.original.active ? <IconX size={16} /> : <IconCheck size={16} />}
			onClick={() => onDisableProduct(row.original.uuid)}
		>
			{row.original.active ? "Desactivar" : "Activar"}
		</Menu.Item>,
		<Menu.Item
			key="delete"
			icon={<IconTrash size={16} />}
			onClick={() => onDeleteProduct(row.original)}
		>
			Eliminar
		</Menu.Item>,
	];

	return (
		<>
			<ProductsDetail uuid={productUuid} opened={opened} onClose={close} />
			<Box>
				<Flex
					gap="md"
					justify="space-between"
					align="center"
					direction="row"
					wrap="nowrap"
					mb={25}
				>
					<Title order={1}>Productos</Title>

					<Button
						variant="outline"
						leftIcon={<IconPlus size={16} />}
						onClick={() => onOpenProductsFormModal()}
					>
						Agregar nuevo producto
					</Button>
				</Flex>

				<SimpleTable cols={cols} getQueryFn={getProductQuery({})} actions={actions} />
			</Box>
		</>
	);
};

export default ProductsList;

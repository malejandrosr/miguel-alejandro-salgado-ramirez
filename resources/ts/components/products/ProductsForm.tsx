import { useForm, useWatch } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { Button, Grid, Text } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";

import { baseManagerApi } from "@api/base";
import { products as apiProducts } from "@api/products";
import { FormProvider, RHFNumberInput, RHFTextInput, RHFTextarea } from "@core/components";
import { useHandleServerRequest } from "@core/hooks";
import { useEffect } from "react";

const { useGetQuery } = baseManagerApi;
const { usePersistProductMutation } = apiProducts;

const ProductsForm = ({ innerProps: { product } }: COMPONENTS.Products.IProductFormProps) => {
	const { data, isSuccess } = useGetQuery({ module: "/banxico" });

	const [submitForm] = usePersistProductMutation();
	const { handleServerRequest } = useHandleServerRequest();

	// const productSchema = Yup.object().shape({
	// 	sku: Yup.string().required("Debes de ingresar un sku").typeError("Ingresa un valor"),
	// 	dollar_price: Yup.number().required("Debes ingresar un precio en dolares").typeError("Ingresa un valor"),
	// 	peso_price: Yup.number().required("Debes ingresar un precio en pesos").typeError("Ingresa un valor"),
	// 	points: Yup.number().required("Debes ingresar puntos").typeError("Ingresa un valor"),
	// 	name: Yup.object().shape({
	// 		es: Yup.string().required("Debes de ingresar un nombre en español").typeError("Ingresa un valor"),
	// 		en: Yup.string().required("Debes de ingresar un nombre en ingles").typeError("Ingresa un valor"),
	// 	}),
	// 	short_description: Yup.object().shape({
	// 		es: Yup.string().required("Debes de ingresar una descripción corta en español").typeError("Ingresa un valor"),
	// 		en: Yup.string().required("Debes de ingresar una descripción corta en ingles").typeError("Ingresa un valor"),
	// 	}),
	// 	long_description: Yup.object().shape({
	// 		es: Yup.string().required("Debes de ingresar una descripción larga en español").typeError("Ingresa un valor"),
	// 		en: Yup.string().required("Debes de ingresar una descripción larga en ingles").typeError("Ingresa un valor"),
	// 	}),
	// });

	const defaultValues: API.Products.IPersistProductParams = {
		uuid: product ? product.uuid : undefined,
		sku: product ? product.sku : "",
		dollar_price: product ? product.dollar_price : 0,
		peso_price: product ? product.peso_price : 0,
		points: product ? product.points : 0,
		name: {
			es:
				product && product.product_translations
					? product.product_translations.filter((pt) => pt.language === "es")[0].name
					: "",
			en:
				product && product.product_translations
					? product.product_translations.filter((pt) => pt.language === "en")[0].name
					: "",
		},
		short_description: {
			es:
				product && product.product_translations
					? product.product_translations.filter((pt) => pt.language === "es")[0]
							.short_description
					: "",
			en:
				product && product.product_translations
					? product.product_translations.filter((pt) => pt.language === "en")[0]
							.short_description
					: "",
		},
		long_description: {
			es: product
				? product.product_translations?.filter((pt) => pt.language === "es")[0]
						.long_description
				: "",
			en: product
				? product.product_translations?.filter((pt) => pt.language === "en")[0]
						.long_description
				: "",
		},
	};

	const formMethods = useForm<API.Products.IPersistProductParams>({
		// resolver: yupResolver(productSchema),
		defaultValues,
	});

	const { handleSubmit: submitRHF } = formMethods;

	const handleSubmit = async (data: API.Products.IPersistProductParams) => {
		await submitForm(data).unwrap();

		closeAllModals();
	};

	const {
		formState: { isSubmitting },
		setError,
		control,
		setValue,
	} = formMethods;

	const onSubmit = (data: API.Products.IPersistProductParams) =>
		handleServerRequest(() => handleSubmit(data), setError);

	const dollarPriceWatcher = useWatch({ name: "dollar_price", control });

	useEffect(() => {
		if (data && isSuccess) {
			setValue("peso_price", dollarPriceWatcher * Number(data.data.dato));
		} else {
			setValue("peso_price", dollarPriceWatcher * 0);
		}
	}, [data, isSuccess, dollarPriceWatcher]);

	return (
		<FormProvider methods={formMethods} onSubmit={submitRHF(onSubmit)}>
			<Grid>
				<Grid.Col span={12}>
					<RHFTextInput name="sku" label="Sku" />
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFNumberInput
						name="dollar_price"
						label="Precio Dolares"
						min={0}
						step={0.1}
						precision={2}
					/>
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFNumberInput
						name="peso_price"
						label="Precio Pesos"
						min={0}
						step={0.1}
						precision={2}
						readOnly
					/>
				</Grid.Col>

				<Grid.Col span={12}>
					<RHFNumberInput name="points" label="Puntos" min={0} />
				</Grid.Col>

				<Grid.Col span={12}>
					<Text weight={600}>Español</Text>
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFTextInput name="name.es" label="Nombre" />
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFTextInput name="short_description.es" label="Descripción Corta" />
				</Grid.Col>

				<Grid.Col span={12}>
					<RHFTextarea name="long_description.es" label="Descripción Larga" />
				</Grid.Col>

				<Grid.Col span={12}>
					<Text weight={600}>Ingles</Text>
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFTextInput name="name.en" label="Nombre" />
				</Grid.Col>

				<Grid.Col span={6}>
					<RHFTextInput name="short_description.en" label="Descripción Corta" />
				</Grid.Col>

				<Grid.Col span={12}>
					<RHFTextarea name="long_description.en" label="Descripción Larga" />
				</Grid.Col>

				<Grid.Col span={12}>
					<Button type="submit" loading={isSubmitting} fullWidth>
						Guardar cambios
					</Button>
				</Grid.Col>
			</Grid>
		</FormProvider>
	);
};

export default ProductsForm;

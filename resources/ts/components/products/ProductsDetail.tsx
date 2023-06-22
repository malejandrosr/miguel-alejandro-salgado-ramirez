import { useState } from "react";
import {
	Box,
	Card,
	Drawer,
	Grid,
	Group,
	Skeleton,
	Stack,
	Text,
	Title,
	ScrollArea,
	Center,
	NumberInput,
} from "@mantine/core";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { products as apiProducts } from "@api/products";
import { MonthPickerInput } from "@mantine/dates";

const { useGetProuductQuery } = apiProducts;

const ProductsDetail = ({ uuid, opened, onClose }: COMPONENTS.Products.IProductDetailProps) => {
	const { data, isLoading, isSuccess } = useGetProuductQuery(uuid);

	const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
	const [percentage, setPercentage] = useState<number | "">(2);

	if (isLoading || !isSuccess) {
		return <></>;
	}

	const generateData = () => {
		let initProjection = Number(percentage);

		const format = "YYYY-MM-DD";
		const date1 = dayjs(dates[0], format);
		const date2 = dayjs(dates[1], format);
		const diff = date2.diff(date1, "month");

		const options: (string | number)[] = [];
		const dataInDollars: number[] = [];
		const dataInPesos: number[] = [];

		for (let i = 0; i <= diff; i++) {
			const month = date1.add(i, "month").format("MMMM YYYY");
			options.push(month);

			// eslint-disable-next-line prettier/prettier
			dataInDollars.push(
				data.data.dollar_price + data.data.dollar_price * (initProjection / 100),
			);
			// eslint-disable-next-line prettier/prettier
			dataInPesos.push(data.data.peso_price + data.data.peso_price * (initProjection / 100));

			initProjection += Number(percentage);
		}

		return {
			options,
			dataInDollars,
			dataInPesos,
		};
	};

	return (
		<Drawer opened={opened} onClose={onClose} size="xl" position="right">
			<Box p={10}>
				<Group position="apart">
					<Title weight={600} order={1}>
						SKU Producto: {data.data.sku}
					</Title>
				</Group>
			</Box>

			<ScrollArea offsetScrollbars type="hover">
				<Box>
					<Grid>
						<Grid.Col span={12}>
							<CardParent isLoading={isLoading} spacing={5}>
								<Group position="apart" spacing={2}>
									<Text weight={600}>Precio en Dolares</Text>
									<Text weight={500}>${data.data.dollar_price} USD</Text>
								</Group>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Precio en Pesos</Text>
									<Text weight={500}>${data.data.peso_price} MXN</Text>
								</Group>
							</CardParent>
						</Grid.Col>

						<Grid.Col span={12}>
							<CardParent isLoading={isLoading} spacing={5}>
								<Title weight={600} size="h3">
									Español
								</Title>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Nombre</Text>
									<Text weight={500}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "es",
											)[0].name
										}
									</Text>
								</Group>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Descripción Corta</Text>
									<Text weight={500}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "es",
											)[0].short_description
										}
									</Text>
								</Group>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Descripción Larga</Text>
									<Text weight={500} lineClamp={1}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "es",
											)[0].long_description
										}
									</Text>
								</Group>
							</CardParent>
						</Grid.Col>

						<Grid.Col span={12}>
							<CardParent isLoading={isLoading} spacing={5}>
								<Title weight={600} size="h3">
									Ingles
								</Title>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Nombre</Text>
									<Text weight={500}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "en",
											)[0].name
										}
									</Text>
								</Group>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Descripción Corta</Text>
									<Text weight={500}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "en",
											)[0].short_description
										}
									</Text>
								</Group>

								<Group position="apart" spacing={2}>
									<Text weight={600}>Descripción Larga</Text>
									<Text weight={500} lineClamp={1}>
										{
											data.data.product_translations?.filter(
												(pt) => pt.language === "en",
											)[0].long_description
										}
									</Text>
								</Group>
							</CardParent>
						</Grid.Col>

						<Grid.Col span={12}>
							<CardParent isLoading={isLoading} spacing={5}>
								<Title weight={600} size="h3">
									Proyección
								</Title>

								<Grid>
									<Grid.Col span={6}>
										<MonthPickerInput
											type="range"
											locale="es"
											label="Meses"
											placeholder="Seleccionar meses"
											value={dates}
											onChange={setDates}
										/>
									</Grid.Col>

									<Grid.Col span={6}>
										<NumberInput
											placeholder="2%"
											label="Porcentage de Proyección"
											value={percentage}
											onChange={setPercentage}
											min={2}
										/>
									</Grid.Col>
								</Grid>

								<Center>
									<Chart
										options={{
											chart: {
												id: "apexchart-example",
											},
											dataLabels: {
												enabled: false,
											},
											xaxis: {
												categories: generateData().options,
											},
											yaxis: {
												tickAmount: 3,
												labels: {
													formatter: function (val) {
														return val.toFixed(2);
													},
												},
											},
										}}
										series={[
											{
												name: "Precio Dolares",
												data: generateData().dataInDollars,
											},
											{
												name: "Precio Pesos",
												data: generateData().dataInPesos,
											},
										]}
										type="bar"
										width={500}
										height={320}
									/>
								</Center>
							</CardParent>
						</Grid.Col>
					</Grid>
				</Box>
			</ScrollArea>
		</Drawer>
	);
};

const CardParent = ({
	children,
	isLoading,
	spacing,
}: COMPONENTS.Products.IProductDetailCardParentProps) => {
	return (
		<Skeleton visible={isLoading} style={{ height: "100%" }}>
			<Card withBorder style={{ height: "100%", padding: "15px" }}>
				<Stack spacing={spacing}>{children}</Stack>
			</Card>
		</Skeleton>
	);
};

export default ProductsDetail;

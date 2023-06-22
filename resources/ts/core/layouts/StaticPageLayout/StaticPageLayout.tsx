import { Outlet } from "react-router-dom";
import { Box, useMantineTheme } from "@mantine/core";

const StaticPageLayout = ({ px = 20, py = 20 }: CORE.Layouts.IStaticPageLayout) => {
	const theme = useMantineTheme();

	return (
		<Box
			px={px}
			py={py}
			style={{
				background:
					theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
			}}
		>
			<Outlet />
		</Box>
	);
};

export default StaticPageLayout;

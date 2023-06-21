import { Box, useMantineTheme } from "@mantine/core";

const PageLayout = ({ children, px = 20, py = 20 }: CORE.Layouts.IPageLayout) => {
	const theme = useMantineTheme();

	return (
		<Box
			px={px}
			py={py}
			style={{
				background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
			}}
		>
			{children}
		</Box>
	);
};

export default PageLayout;

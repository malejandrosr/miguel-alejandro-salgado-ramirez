import { createStyles } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		wrapper: {
			minHeight: "100vh",
			backgroundSize: "cover",
		},

		form: {
			borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
			minHeight: "100vh",
			maxWidth: 450,
			paddingTop: 80,

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				maxWidth: "100%",
			},
		},
	};
});

export default styles;

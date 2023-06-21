import { createStyles } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		image: {
			border: `5px solid ${theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1]}`,
			borderRadius: "10px",
			background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
		},

		brandContainer: {
			[theme.fn.smallerThan("md")]: {
				display: "none",
			},
		},

		brandContainerText: {
			color: theme.colorScheme === "dark" ? "#fff" : "#000",
			fontSize: "19px",
			fontWeight: 600,
			lineHeight: "100%",
		},
	};
});

export default styles;

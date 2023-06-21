import { createStyles } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		root: {
			paddingTop: 200,
			paddingBottom: 200,
		},

		label: {
			textAlign: "center",
			fontWeight: 900,
			fontSize: 220,
			lineHeight: 1,
			marginBottom: +theme.spacing.xl * 1.5,
			color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

			[theme.fn.smallerThan("sm")]: {
				fontSize: 120,
			},
		},

		title: {
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,
			textAlign: "center",
			fontWeight: 900,
			fontSize: 38,

			[theme.fn.smallerThan("sm")]: {
				fontSize: 32,
			},
		},

		description: {
			maxWidth: 500,
			margin: "auto",
			marginTop: theme.spacing.xl,
			marginBottom: +theme.spacing.xl * 1.5,
		},
	};
});

export default styles;

import { createStyles, px } from "@mantine/core";

import { headerSmWidth, headerBaseWidth } from "@core/constants";

const styles = createStyles((theme) => {
	return {
		header: {
			paddingLeft: theme.spacing.md,
			paddingRight: theme.spacing.md,
		},

		inner: {
			height: 70,
			display: "flex",
			alignItems: "center",
		},

		brand: {
			display: "flex",
			alignItems: "center",
			height: "100%",
			width: `calc(100% - ${px(theme.spacing.sm)}px)`,
			maxWidth: headerBaseWidth - px(theme.spacing.md),

			[theme.fn.smallerThan("md")]: {
				maxWidth: headerSmWidth - 14.99,
			},

			[theme.fn.smallerThan("sm")]: {
				border: "none",
			},
		},

		burgerContainer: {
			[theme.fn.largerThan("sm")]: {
				display: "none",
			},
		},

		tools: {
			display: "flex",
			width: "100%",
			alignItems: "center",
			justifyContent: "space-between",

			[theme.fn.smallerThan("sm")]: {
				justifyContent: "end",
			},
		},

		leftTools: {
			flex: "40% 1 0",
		},

		leftToolsContainer: {
			[theme.fn.smallerThan("sm")]: {
				display: "none",
			},
		},

		rightTools: {
			display: "flex",
			width: "100%",
			alignItems: "center",
			gap: "25px",
			justifyContent: "flex-end",

			[theme.fn.smallerThan("sm")]: {
				justifyContent: "end",
			},
		},
	};
});

export default styles;

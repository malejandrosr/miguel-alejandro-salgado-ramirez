import { createStyles, rem } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		// used for Navbar
		navbar: {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
			paddingBottom: 0,
		},

		header: {
			padding: theme.spacing.md,
			paddingTop: 0,
			marginLeft: `calc(${theme.spacing.md} * -1)`,
			marginRight: `calc(${theme.spacing.md} * -1)`,
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
			borderBottom: `${rem(1)} solid ${
				theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
		},

		links: {
			marginLeft: `calc(${theme.spacing.md} * -1)`,
			marginRight: `calc(${theme.spacing.md} * -1)`,
		},

		linksInner: {
			paddingTop: theme.spacing.xl,
			paddingBottom: theme.spacing.xl,
		},

		footer: {
			marginLeft: `calc(${theme.spacing.md} * -1)`,
			marginRight: `calc(${theme.spacing.md} * -1)`,
			borderTop: `${rem(1)} solid ${
				theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
		},

		// used for NavLink and NavGroup
		control: {
			fontWeight: 500,
			display: "block",
			width: "100%",
			padding: `${theme.spacing.xs} ${theme.spacing.md}`,
			color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
			fontSize: theme.fontSizes.sm,

			"&:hover": {
				backgroundColor:
					theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
				color: theme.colorScheme === "dark" ? theme.white : theme.black,
			},
		},

		link: {
			fontWeight: 500,
			display: "block",
			textDecoration: "none",
		},

		sublink: {
			fontWeight: 500,
			display: "block",
			textDecoration: "none",
			padding: `${theme.spacing.xs} ${theme.spacing.md}`,
			paddingLeft: rem(31),
			marginLeft: rem(30),
			fontSize: theme.fontSizes.sm,
			color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
			borderLeft: `${rem(1)} solid ${
				theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,

			"&:hover": {
				backgroundColor:
					theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
				color: theme.colorScheme === "dark" ? theme.white : theme.black,
			},
		},

		chevron: {
			transition: "transform 200ms ease",
		},

		active: {
			"&, &:hover": {
				backgroundColor: theme.fn.variant({
					variant: "light",
					color: theme.primaryColor,
				}).background,
				color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
			},
		},

		activeSublink: {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.colors.gray[5],
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.colors.gray[5] }).color,
		},
	};
});

export default styles;

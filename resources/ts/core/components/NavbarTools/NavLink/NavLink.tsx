import { NavLink as ReactRouterDomNavLink } from "react-router-dom";
import { Box, Group, ThemeIcon, UnstyledButton } from "@mantine/core";

import { useActiveLink } from "@core/hooks";
import styles from "../styles";

const NavLink = ({ icon: NavLinkIcon, label, to }: CORE.Components.INavLink) => {
	const { classes, cx } = styles();

	const { activeLink } = useActiveLink();

	return (
		<ReactRouterDomNavLink
			to={to}
			className={cx(classes.link, { [classes.active]: to.includes(activeLink) })}
		>
			<UnstyledButton className={classes.control}>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<NavLinkIcon size={18} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
				</Group>
			</UnstyledButton>
		</ReactRouterDomNavLink>
	);
};

export default NavLink;

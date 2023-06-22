import { NavLink as ReactRouterDomNavLink } from "react-router-dom";
import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { useActiveGroup, useActiveLink } from "@core/hooks";
import { isValidArray } from "@helpers";
import styles from "../styles";

const NavGroupLink = ({
	icon: NavGroupIcon,
	label,
	links,
	root,
}: CORE.Components.INavGroupLink) => {
	const { classes, cx, theme } = styles();

	const { opened, toggle } = useActiveGroup(root);
	const { activeLink } = useActiveLink();

	const hasLinks = isValidArray(links);

	const items = (hasLinks ? links : []).map(({ icon: Icon, label, to }) => (
		<ReactRouterDomNavLink
			to={to}
			key={label}
			className={cx(classes.sublink, {
				[classes.activeSublink]: to.includes(activeLink),
			})}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Icon size={14} />

				<Box ml="md">{label}</Box>
			</Box>
		</ReactRouterDomNavLink>
	));

	const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

	return (
		<>
			<UnstyledButton onClick={() => toggle()} className={classes.control}>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<NavGroupIcon size={18} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>

					<ChevronIcon
						size={14}
						style={{
							transform: opened
								? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
								: "none",
						}}
						className={classes.chevron}
					/>
				</Group>
			</UnstyledButton>

			<Collapse in={opened}>{items}</Collapse>
		</>
	);
};

export default NavGroupLink;

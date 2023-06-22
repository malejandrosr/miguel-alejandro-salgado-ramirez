import { useEffect, useState } from "react";
import { Navbar as MantineNavbar, ScrollArea, Transition } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { NavGroupLink, NavLink } from "@core/components";
import { navbarBaseWidth, navbarSmWidth } from "@core/constants";
import { Links } from "@routes";
import styles from "../styles";

const Navbar = ({ opened }: CORE.Components.INavbar) => {
	const { classes, theme } = styles();

	const [navbarWidth, setNavbarWidth] = useState(navbarBaseWidth);

	const links: JSX.Element[] = Links.map((link) => {
		if ("links" in link) {
			return <NavGroupLink {...link} key={link.label} />;
		}

		return <NavLink {...link} key={link.label} />;
	});

	const maxWidthSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
	const minWidthSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);

	const isDisplaySm = maxWidthSm && minWidthSm;

	useEffect(() => {
		if (isDisplaySm) {
			setNavbarWidth(navbarSmWidth);
			return;
		}

		setNavbarWidth(navbarBaseWidth);
	}, [maxWidthSm, minWidthSm]);

	return (
		<Transition
			mounted={navbarBaseWidth === navbarWidth}
			transition="scale-x"
			duration={400}
			timingFunction="ease"
		>
			{(styles) => (
				<MantineNavbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					style={styles}
					width={{
						sm: navbarBaseWidth,
						md: navbarBaseWidth,
						lg: navbarBaseWidth,
					}}
					onMouseLeave={() => {
						if (isDisplaySm) {
							setNavbarWidth(navbarSmWidth);
						}
					}}
					onMouseEnter={() => {
						if (isDisplaySm) {
							setNavbarWidth(navbarBaseWidth);
						}
					}}
					className={classes.navbar}
				>
					<MantineNavbar.Section grow component={ScrollArea} className={classes.links}>
						<div className={classes.linksInner}>{links}</div>
					</MantineNavbar.Section>
				</MantineNavbar>
			)}
		</Transition>
	);
};

export default Navbar;

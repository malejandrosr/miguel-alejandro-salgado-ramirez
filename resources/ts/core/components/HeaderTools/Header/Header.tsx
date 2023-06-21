import { Burger, Divider, Header as MantineHeader } from "@mantine/core";

import { Logo, ToggleTheme, UserDropdown } from "@core/components";
import styles from "./styles";

const Header = ({ opened, setOpened }: CORE.Components.IHeader) => {
	const { classes, theme } = styles();

	return (
		<MantineHeader height={70} className={classes.header}>
			<div className={classes.inner}>
				<div className={classes.brand}>
					<div className={classes.burgerContainer}>
						<Burger mr="xl" size="md" opened={opened} color={theme.colors.gray[6]} onClick={() => setOpened((o) => !o)} />
					</div>
					<Logo />
				</div>

				<div className={classes.tools}>
					<div className={classes.leftTools}>
						<div className={classes.leftToolsContainer}></div>
					</div>

					<div className={classes.rightTools}>
						<ToggleTheme />
						<Divider orientation="vertical" />
						<UserDropdown />
					</div>
				</div>
			</div>
		</MantineHeader>
	);
};

export default Header;

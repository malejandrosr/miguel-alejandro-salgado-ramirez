import { useState } from "react";
import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";

import { Header, Navbar } from "@core/components";

const AppShell = ({ children }: CORE.Components.IAppShell) => {
	const theme = useMantineTheme();

	const [opened, setOpened] = useState(false);

	return (
		<MantineAppShell
			padding={0}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			header={<Header opened={opened} setOpened={setOpened} />}
			navbar={<Navbar opened={opened} />}
			styles={{
				main: {
					background:
						theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
					borderColor:
						theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
				},
			}}
		>
			{children}
		</MantineAppShell>
	);
};

export default AppShell;

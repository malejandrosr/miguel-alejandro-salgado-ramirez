import { IconCopyright, IconGauge, IconTools, IconUsers } from "@tabler/icons-react";

import { rootPaths } from "./Paths";

const Links: (CORE.Components.INavLink | CORE.Components.INavGroupLink)[] = [
	{
		icon: IconGauge,
		label: "Escritorio",
		to: rootPaths.home,
	},
	{
		icon: IconTools,
		label: "Gestión",
		root: rootPaths.management,
		links: [
			{
				icon: IconUsers,
				label: "Usuarios",
				to: `${rootPaths.management}/users`,
			},
			{
				icon: IconCopyright,
				label: "Roles",
				to: `${rootPaths.management}/roles`,
			},
		],
	},
];

export default Links;

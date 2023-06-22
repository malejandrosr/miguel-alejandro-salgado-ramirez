import {
	IconBoxSeam,
	IconBriefcase,
	// IconCopyright,
	IconGauge,
	// IconTools,
	// IconUsers,
} from "@tabler/icons-react";

import { rootPaths } from "./Paths";

const Links: (CORE.Components.INavLink | CORE.Components.INavGroupLink)[] = [
	{
		icon: IconGauge,
		label: "Escritorio",
		to: rootPaths.home,
	},
	// {
	// 	icon: IconTools,
	// 	label: "Gestión",
	// 	root: rootPaths.management,
	// 	links: [
	// 		{
	// 			icon: IconUsers,
	// 			label: "Usuarios",
	// 			to: `${rootPaths.management}/users`,
	// 		},
	// 		{
	// 			icon: IconCopyright,
	// 			label: "Roles",
	// 			to: `${rootPaths.management}/roles`,
	// 		},
	// 	],
	// },
	{
		icon: IconBriefcase,
		label: "Admin",
		root: rootPaths.admin,
		links: [
			{
				icon: IconBoxSeam,
				label: "Productos",
				to: `${rootPaths.admin}/products`,
			},
		],
	},
];

export default Links;

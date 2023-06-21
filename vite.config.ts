import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import laravel from "laravel-vite-plugin";

import { resolve } from "path";

const resolvePath = (path: string) => resolve(resolve(__dirname), path);

export default defineConfig({
	plugins: [
        react(),
		laravel({
			input: ["resources/css/app.css", "resources/ts/main.tsx"],
			refresh: true,
		}),
	],
    resolve: {
		alias: {
			"@": resolvePath("resources/ts"),
			"@api": resolvePath("resources/ts/api"),
			"@assets": resolvePath("resources/ts/assets"),
			"@components": resolvePath("resources/ts/components"),
			"@constants": resolvePath("resources/ts/constants"),
			"@core": resolvePath("resources/ts/core"),
			"@helpers": resolvePath("resources/ts/helpers"),
			"@interfaces": resolvePath("resources/ts/interfaces"),
			"@pages": resolvePath("resources/ts/pages"),
			"@routes": resolvePath("resources/ts/routes"),
			"@store": resolvePath("resources/ts/store"),
		},
	},
    server: {
		port: 10086,
		open: true,
		cors: true,
	},
});

import { LazyExoticComponent, Suspense } from "react";

import { LoadingScreen } from "@core/components";

const Loader = (Component: LazyExoticComponent<() => JSX.Element>) => (props: any) => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};

export default Loader;

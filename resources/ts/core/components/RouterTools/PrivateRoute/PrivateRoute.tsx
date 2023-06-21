import { shallowEqual, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { AppShell } from "@core/components";

const PrivateRoute = ({ component: Component, ...rest }: CORE.Components.IPrivateRoute) => {
	const { isLogged } = useSelector((state: STORE.ISlice) => state.authSlice, shallowEqual);

	if (!isLogged) {
		return <Navigate to={"/auth"} replace />;
	}

	return (
		<AppShell>
			<Component {...rest} />
		</AppShell>
	);
};

export default PrivateRoute;

import { shallowEqual, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component }: CORE.Components.IPublicRoute) => {
	const { isLogged } = useSelector((state: STORE.ISlice) => state.authSlice, shallowEqual);

	if (isLogged) {
		return <Navigate to={"/home"} replace />;
	}

	return <Component />;
};

export default PublicRoute;

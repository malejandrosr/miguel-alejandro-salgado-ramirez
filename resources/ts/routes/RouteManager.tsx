import { lazy } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";

import { Loader, PrivateRoute, PublicRoute } from "@core/components";
import { StaticPageLayout } from "@core/layouts";

// ** Auth
// Login
const Login = Loader(lazy(() => import("@pages/auth/Login")));

// ** Home
const Home = Loader(lazy(() => import("@pages/main/Home")));

// ** Management
// Users
const UsersList = Loader(lazy(() => import("@pages/main/Management/Users/UsersList")));
const UsersNew = Loader(lazy(() => import("@pages/main/Management/Users/UsersNew")));
const Roles = Loader(lazy(() => import("@pages/main/Management/Roles")));

// ** Error Pages
const P403 = Loader(lazy(() => import("@pages/errors/P403")));
const P404 = Loader(lazy(() => import("@pages/errors/P404")));
const P500 = Loader(lazy(() => import("@pages/errors/P500")));

const RouteManager = () => {
	return useRoutes([
		{
			path: "/",
			element: <Navigate to={"/home"} replace />,
		},
		{
			path: "auth",
			element: <PublicRoute component={() => <StaticPageLayout px={0} py={0} />} />,
			children: [
				{
					index: true,
					element: <Navigate to={"/auth/login"} replace />,
				},
				{
					path: "login",
					element: <Login />,
				},
			],
		},
		{
			path: "home",
			element: <PrivateRoute component={() => <Home />} />,
		},
		{
			path: "management",
			element: <PrivateRoute component={() => <StaticPageLayout />} />,
			children: [
				{
					index: true,
					element: <Navigate to={"/management/users"} replace />,
				},
				{
					path: "users",
					element: <Outlet />,
					children: [
						{
							path: "",
							element: <UsersList />,
						},
						{
							path: "new",
							element: <UsersNew />,
						},
					],
				},
				{
					path: "roles",
					element: <Roles />,
				},
			],
		},
		{
			path: "*",
			children: [
				{ path: "403", element: <P403 /> },
				{ path: "404", element: <P404 /> },
				{ path: "500", element: <P500 /> },
				{ path: "*", element: <Navigate to={"404"} replace /> },
			],
		},
	]);
};

export default RouteManager;

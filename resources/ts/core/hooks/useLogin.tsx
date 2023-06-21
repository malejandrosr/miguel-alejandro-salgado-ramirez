import { useDispatch } from "react-redux";

import { setUser, removeUser } from "@store/slices/authSlice";

const useLogin = () => {
	const dispatch = useDispatch();

	const handleLogin = (user: API.Auth.ILogin) => dispatch(setUser({ isLogged: true, ...user }));

	const handleLogout = () => dispatch(removeUser());

	return {
		handleLogin,
		handleLogout,
	};
};

export default useLogin;

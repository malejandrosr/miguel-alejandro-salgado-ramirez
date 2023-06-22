import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Group } from "@mantine/core";

import logo from "@assets/logo.svg";

import styles from "./styles";

const LoadingScreen = () => {
	const { classes } = styles();

	const { pathname } = useLocation();

	const getClassNameOfLayoutType = () =>
		pathname.includes("dashboard") ? classes.dashboard : classes.auth;

	return (
		<Group position="center" className={getClassNameOfLayoutType()}>
			<div className={classes.spinnerContainer}>
				<PuffLoader color="rgb(36 58 142 / 63%)" size={150} />
			</div>

			<img src={logo} alt="logo" width={85} />
		</Group>
	);
};

export default LoadingScreen;

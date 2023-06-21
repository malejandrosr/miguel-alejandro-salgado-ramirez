import { createStyles } from "@mantine/core";

const styles = createStyles(() => {
	return {
		dashboard: {
			width: "100%",
			height: "100vh",
			position: "relative",
		},
		auth: {
			width: "100%",
			height: "100vh",
			position: "relative",
		},
		spinnerContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
	};
});

export default styles;

import { BackgroundImage, Paper } from "@mantine/core";
import styles from "./styles";

const Layout = ({ children }: COMPONENTS.Auth.ILayout) => {
	const { classes } = styles();

	return (
		<BackgroundImage
			src="https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"
			radius={0}
			className={classes.wrapper}
		>
			<Paper radius={0} p={25} className={classes.form}>
				{children}
			</Paper>
		</BackgroundImage>
	);
};

export default Layout;

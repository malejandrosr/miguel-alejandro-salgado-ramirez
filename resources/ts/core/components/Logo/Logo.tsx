import { Box, Group, Image, Text } from "@mantine/core";

import logo from "@assets/logo.svg";
import styles from "./styles";

const Logo = () => {
	const { classes } = styles();

	return (
		<Box>
			<Group position="apart">
				<Image
					width={50}
					height={45}
					src={logo}
					alt="logo"
					classNames={{
						image: classes.image,
					}}
				/>

				<div className={classes.brandContainer}>
					<Text className={classes.brandContainerText}>
						{import.meta.env.VITE_APP_NAME}
					</Text>
				</div>
			</Group>
		</Box>
	);
};

export default Logo;

import { useNavigate } from "react-router-dom";
import { Button, Container, Group, Text, Title } from "@mantine/core";

import styles from "./styles";

const P404 = () => {
	const navigate = useNavigate();

	const { classes } = styles();

	return (
		<Container className={classes.root}>
			<div className={classes.label}>404</div>
			<Title className={classes.title}>Lo sentimos.</Title>
			<Text color="dimmed" size="lg" align="center" className={classes.description}>
				Desafortunadamente la página que desea consultar no existe.
			</Text>
			<Group position="center">
				<Button variant="subtle" size="md" onClick={() => navigate("/home")}>
					Volver al inicio
				</Button>
			</Group>
		</Container>
	);
};

export default P404;

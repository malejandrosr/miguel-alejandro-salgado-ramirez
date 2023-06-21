import { Text, Title, Group } from "@mantine/core";

import { Auth, LoginForm } from "@components/auth";

const Login = () => {
	return (
		<Auth.Layout>
			<Group mb={35}>
				<Title order={1} align="center" mt="md" mb={30}>
					¡Bienvenido de Nuevo!
				</Title>

				<Text>Ingresa tus credenciales para acceder a la plataforma</Text>
			</Group>

			<LoginForm />
		</Auth.Layout>
	);
};

export default Login;

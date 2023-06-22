import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { Avatar, Box, Button, Flex, Group, Text, Title } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

import { users as usersApi } from "@api/users";
import { SimpleTable } from "@core/components";

const { useGetUsersListQuery } = usersApi;

const UsersList = () => {
	const getUserQuery =
		(params: API.Users.IGetUsersQuery) => (page: number, search: string, size?: number) =>
			useGetUsersListQuery({ page, search, size, ...params });

	const cols = useMemo<MRT_ColumnDef<GENERAL.Models.IUser>[]>(
		() => [
			{
				accessorFn: (row) => (
					<Group>
						<Avatar src={row.avatar} radius="xl" size="sm" alt="User avatar" />
						<Text weight={600}>{`${row.name} ${row.lastname}`}</Text>
					</Group>
				),
				header: "Nombre",
				id: "name",
				enableHiding: false,
			},
			{
				accessorKey: "email",
				header: "Correo Electrónico",
				id: "email",
			},
			{
				accessorKey: "phone",
				header: "Teléfono",
				id: "phone",
			},
		],
		[],
	);

	return (
		<Box>
			<Flex
				gap="md"
				justify="space-between"
				align="center"
				direction="row"
				wrap="wrap"
				mb={25}
			>
				<Title order={1}>Usuarios</Title>

				<Button variant="outline" leftIcon={<IconUserPlus size={16} />}>
					Agregar nuevo usuario
				</Button>
			</Flex>

			<SimpleTable cols={cols} getQueryFn={getUserQuery({})} />
		</Box>
	);
};

export default UsersList;

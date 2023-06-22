import { useSelector } from "react-redux";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconDoorExit as DoorExit } from "@tabler/icons-react";

import { auth } from "@api/auth";
import { Avatar } from "@core/components";
import { useHandleServerRequest, useLogin } from "@core/hooks";
import styles from "./styles";

const { useLazyLogoutQuery } = auth;

const UserDropdown = () => {
	const { handleLogout } = useLogin();

	const [submitLogout] = useLazyLogoutQuery();
	const { handleServerRequest } = useHandleServerRequest();

	const { name, lastname, email } = useSelector(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		(state: STORE.ISlice) => state.authSlice.user!,
	);

	const { classes } = styles();

	const handleSubmit = async () => {
		const { logout } = await submitLogout().unwrap();

		if (logout) {
			handleLogout();
		}
	};

	const onSubmit = () => handleServerRequest(() => handleSubmit());

	return (
		<Group position="center">
			<Menu
				position="bottom"
				transitionProps={{
					transition: "pop",
				}}
				withArrow
				arrowPosition="center"
				classNames={{ dropdown: classes.dropdown }}
			>
				<Menu.Target>
					<UnstyledButton>
						<Group>
							<Avatar
								color="blue"
								radius="xl"
								size={40}
								name={`${name} ${lastname}`}
							/>

							<div className={classes.userInfoContainer}>
								<Text weight={600} size={12} mr={3}>
									{`${name} ${lastname}`}
								</Text>

								<Text weight={500} size={10} color="dimmed">
									{email}
								</Text>
							</div>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item icon={<DoorExit />} color="red" onClick={() => onSubmit()}>
						Cerrar Sesión
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};

export default UserDropdown;

import { Controller, useFormContext } from "react-hook-form";
import { PasswordInput } from "@mantine/core";
import { IconEye as Eye, IconEyeOff as EyeOff } from "@tabler/icons-react";

import styles from "@core/components/HookForm/styles";

const RHFPasswordInput = ({ label, name, onChange, ...rest }: CORE.Components.IRHFPasswordInput) => {
	const { control } = useFormContext();

	const { classes } = styles();

	const handleOnChange = (fieldOnChange: (value: any) => void) => (event: any) => {
		if (typeof onChange === "function") {
			onChange(event);
		}

		fieldOnChange(event);
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<PasswordInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					visibilityToggleIcon={({ reveal, size }) => (reveal ? <EyeOff size={size} /> : <Eye size={size} />)}
					onChange={handleOnChange(field.onChange)}
					autoComplete="off"
					classNames={{
						innerInput: classes.innerInput,
						// invalid: classes.invalidPassword,
						input: classes.inputPassword,
						label: `${classes.label} ${error && classes.labelError}`,
					}}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFPasswordInput;

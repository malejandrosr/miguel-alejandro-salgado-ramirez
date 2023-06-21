import { useFormContext, Controller } from "react-hook-form";
import { TextInput } from "@mantine/core";

import styles from "../styles";

const RHFTextInput = ({ label, name, ...rest }: CORE.Components.IRHFTextInput) => {
	const { control } = useFormContext();

	const { classes } = styles();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					classNames={{
						// invalid: classes.invalid,
						input: classes.input,
						label: `${classes.label} ${error && classes.labelError}`,
					}}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFTextInput;

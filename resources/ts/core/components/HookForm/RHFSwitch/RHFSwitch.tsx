import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@mantine/core";

const RHFSwitch = ({ label, name, onChange, ...rest }: CORE.Components.IRHFSwitch) => {
	const { control } = useFormContext();

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
				<Switch
					{...field}
					id={name}
					label={label}
					error={error?.message}
					checked={field.value}
					onChange={handleOnChange(field.onChange)}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFSwitch;

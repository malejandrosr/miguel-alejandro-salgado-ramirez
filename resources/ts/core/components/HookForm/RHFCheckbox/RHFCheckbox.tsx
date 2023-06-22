import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@mantine/core";

const RHFCheckbox = ({ label, name, ...rest }: CORE.Components.IRHFCheckbox) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Checkbox
					{...field}
					id={name}
					label={label}
					error={error?.message}
					checked={field.value}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFCheckbox;
